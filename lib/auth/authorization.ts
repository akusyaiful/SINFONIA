
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type UserRole =
  | "admin"
  | "teacher"
  | "student"
  | "parent";

type AuthenticatedUser = {
  id: string;
  email?: string;
};

type AuthorizationResult =
  | {
      authorized: true;
      supabase: Awaited<ReturnType<typeof createClient>>;
      user: AuthenticatedUser;
      roles: UserRole[];
    }
  | {
      authorized: false;
      user: AuthenticatedUser | null;
      roles: UserRole[];
      response: NextResponse;
    };

export async function requireRole(
  allowedRoles: UserRole[]
): Promise<AuthorizationResult> {
  const supabase = await createClient();

  // 1. Validasi session pengguna
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Silakan login terlebih dahulu.",
        },
        { status: 401 }
      ),
    };
  }

  // 2. Periksa profil pengguna
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_active, must_change_password")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa profil pengguna.",
        },
        { status: 500 }
      ),
    };
  }

  if (!profile) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Profil pengguna tidak ditemukan.",
        },
        { status: 404 }
      ),
    };
  }

  // 3. Periksa status akun
  if (!profile.is_active) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Akun pengguna tidak aktif.",
        },
        { status: 403 }
      ),
    };
  }

  // 4. Periksa kewajiban mengganti password
  if (profile.must_change_password) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          code: "PASSWORD_CHANGE_REQUIRED",
          message:
            "Anda wajib mengganti password sebelum mengakses fitur ini.",
        },
        { status: 403 }
      ),
    };
  }

  // 5. Ambil role pengguna
  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  if (roleError) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa role pengguna.",
        },
        { status: 500 }
      ),
    };
  }

  // 6. Filter role yang valid
  const validRoles: UserRole[] = [
    "admin",
    "teacher",
    "student",
    "parent",
  ];

  const roles = (roleData ?? [])
    .map((item) => item.role)
    .filter((role): role is UserRole =>
      validRoles.includes(role as UserRole)
    );

  if (roles.length === 0) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          message: "Pengguna belum memiliki role yang valid.",
        },
        { status: 403 }
      ),
    };
  }

  // 7. Periksa izin akses
  const hasAccess = roles.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) {
    return {
      authorized: false,
      user: {
        id: user.id,
        email: user.email,
      },
      roles,
      response: NextResponse.json(
        {
          success: false,
          message: "Anda tidak memiliki izin untuk mengakses fitur ini.",
        },
        { status: 403 }
      ),
    };
  }

  // 8. Pengguna berhasil diotorisasi
  return {
    authorized: true,
    supabase,
    user: {
      id: user.id,
      email: user.email,
    },
    roles,
  };
}
