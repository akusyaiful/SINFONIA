import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Validasi pengguna yang sedang login
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Pengguna belum login.",
        },
        { status: 401 }
      );
    }

    // 2. Ambil data profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone, avatar_url, is_active, created_at, updated_at"
      )
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengambil data profil.",
        },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profil pengguna tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    // 3. Ambil role pengguna
    const { data: roles, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (roleError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengambil role pengguna.",
        },
        { status: 500 }
      );
    }

    // 4. Kirim response
    return NextResponse.json({
      success: true,
      message: "Data profil berhasil diambil.",
      data: {
        profile,
        roles: roles.map((item) => item.role),
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}
