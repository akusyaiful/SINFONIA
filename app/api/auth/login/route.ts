
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
] as const;

export async function POST(request: Request) {
  try {
    // 1. Baca dan validasi request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Format JSON tidak valid.",
        },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Data login tidak valid.",
        },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    if (
      typeof input.email !== "string" ||
      typeof input.password !== "string" ||
      !input.email.trim() ||
      !input.password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan password wajib diisi.",
        },
        { status: 400 }
      );
    }

    const email = input.email.trim();
    const password = input.password;

    // 2. Buat Supabase client
    const supabase = await createClient();

    // 3. Autentikasi melalui Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password tidak valid.",
        },
        { status: 401 }
      );
    }

    // 4. Ambil informasi profil
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, is_active, must_change_password")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      await supabase.auth.signOut({ scope: "local" });

      console.error("Login profile error:", profileError);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa profil pengguna.",
        },
        { status: 500 }
      );
    }

    if (!profile) {
      await supabase.auth.signOut({ scope: "local" });

      return NextResponse.json(
        {
          success: false,
          message: "Profil pengguna tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // 5. Periksa status akun
    if (!profile.is_active) {
      await supabase.auth.signOut({ scope: "local" });

      return NextResponse.json(
        {
          success: false,
          message: "Akun pengguna tidak aktif.",
        },
        { status: 403 }
      );
    }

    // 6. Ambil role pengguna
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (roleError) {
      await supabase.auth.signOut({ scope: "local" });

      console.error("Login role error:", roleError);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa role pengguna.",
        },
        { status: 500 }
      );
    }

    // 7. Validasi role
    const roles = (roleData ?? [])
      .map((item) => item.role)
      .filter(
        (role): role is (typeof VALID_ROLES)[number] =>
          VALID_ROLES.includes(
            role as (typeof VALID_ROLES)[number]
          )
      );

    if (roles.length === 0) {
      await supabase.auth.signOut({ scope: "local" });

      return NextResponse.json(
        {
          success: false,
          message: "Pengguna belum memiliki role yang valid.",
        },
        { status: 403 }
      );
    }

    // 8. Kirim response berhasil
    return NextResponse.json(
      {
        success: true,
        message: "Login berhasil.",
        data: {
          user: {
            id: user.id,
            email: user.email,
            full_name: profile.full_name,
          },
          roles,
          mustChangePassword: profile.must_change_password,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Login server error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  }
}
