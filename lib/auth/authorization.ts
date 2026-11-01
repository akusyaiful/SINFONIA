
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type UserRole =
  | "admin"
  | "teacher"
  | "student"
  | "parent";

interface AuthorizationResult {
  authorized: boolean;
  user: {
    id: string;
    email?: string;
  } | null;
  roles: UserRole[];
  response?: NextResponse;
}

export async function requireRole(
  allowedRoles: UserRole[]
): Promise<AuthorizationResult> {
  const supabase = await createClient();

  // 1. Periksa autentikasi pengguna
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


  // Periksa apakah pengguna wajib mengganti password
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("must_change_password")
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
          message: "Gagal memeriksa status password.",
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

  if (profile.must_change_password) {
    return {
      authorized: false,
      user: null,
      roles: [],
      response: NextResponse.json(
        {
          success: false,
          code: "PASSWORD_CHANGE_REQUIRED",
          message: "Anda wajib mengganti password sebelum mengakses fitur ini.",
        },
        { status: 403 }
      ),
    };
  }

  // 2. Ambil role dari database
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
          message: "Gagal memeriksa hak akses pengguna.",
        },
        { status: 500 }
      ),
    };
  }

  // 3. Validasi role
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

  // 4. Periksa apakah pengguna memiliki role yang diizinkan
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

  return {
    authorized: true,
    user: {
      id: user.id,
      email: user.email,
    },
    roles,
  };
}
