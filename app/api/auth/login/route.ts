import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim();
    const password = body.password;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan password wajib diisi.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Autentikasi melalui Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password tidak valid.",
        },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("must_change_password")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa status password pengguna.",
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

    return NextResponse.json({
      success: true,
      message: "Login berhasil.",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        mustChangePassword: profile.must_change_password,
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
