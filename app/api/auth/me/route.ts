
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
] as const;

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Validasi session pengguna
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Pengguna belum login atau session tidak valid.",
        },
        {
          status: 401,
          headers: { "Cache-Control": "private, no-store" },
        }
      );
    }

    // 2. Ambil profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone, avatar_url, is_active, must_change_password"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Auth profile error:", profileError);

      return NextResponse.json(
        {
          success: false,
          authenticated: true,
          message: "Gagal mengambil profil pengguna.",
        },
        {
          status: 500,
          headers: { "Cache-Control": "private, no-store" },
        }
      );
    }

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          authenticated: true,
          message: "Profil pengguna tidak ditemukan.",
        },
        {
          status: 404,
          headers: { "Cache-Control": "private, no-store" },
        }
      );
    }

    // 3. Periksa status akun
    if (!profile.is_active) {
      await supabase.auth.signOut({ scope: "local" });

      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Akun pengguna tidak aktif.",
        },
        {
          status: 403,
          headers: { "Cache-Control": "private, no-store" },
        }
      );
    }

    // 4. Ambil role pengguna
    const { data: userRoles, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (roleError) {
      console.error("Auth role error:", roleError);

      return NextResponse.json(
        {
          success: false,
          authenticated: true,
          message: "Gagal mengambil role pengguna.",
        },
        {
          status: 500,
          headers: { "Cache-Control": "private, no-store" },
        }
      );
    }

    // 5. Filter role yang valid
    const roles = (userRoles ?? [])
      .map((item) => item.role)
      .filter(
        (role): role is (typeof VALID_ROLES)[number] =>
          VALID_ROLES.includes(
            role as (typeof VALID_ROLES)[number]
          )
      );

    // 6. Siapkan response
    return NextResponse.json(
      {
        success: true,
        authenticated: true,
        message: "Session pengguna valid.",
        data: {
          user: {
            id: user.id,
            email: user.email,
          },
          profile: {
            id: profile.id,
            full_name: profile.full_name,
            email: profile.email || user.email,
            phone: profile.phone,
            avatar_url: profile.avatar_url,
            is_active: profile.is_active,
            must_change_password: profile.must_change_password,
          },
          roles,
          mustChangePassword: profile.must_change_password,
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "private, no-store" },
      }
    );
  } catch (error) {
    console.error("Auth me error:", error);

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        message: "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "private, no-store" },
      }
    );
  }
}
