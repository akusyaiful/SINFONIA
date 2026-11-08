
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // 1. Periksa session pengguna
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Silakan login terlebih dahulu.",
        },
        { status: 401 }
      );
    }

    // 2. Validasi format JSON
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Format request tidak valid.",
        },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Format data tidak valid.",
        },
        { status: 400 }
      );
    }

    const { newPassword, confirmPassword } = body;

    // 3. Validasi input
    if (
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string" ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Password baru dan konfirmasi wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
      return NextResponse.json(
        {
          success: false,
          message: "Password harus terdiri dari 8–72 karakter.",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Konfirmasi password tidak cocok.",
        },
        { status: 400 }
      );
    }

    // 4. Ambil profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, is_active, must_change_password")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal memeriksa profil pengguna.",
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

    if (!profile.is_active) {
      return NextResponse.json(
        {
          success: false,
          message: "Akun pengguna tidak aktif.",
        },
        { status: 403 }
      );
    }

    // 5. Pastikan pengguna wajib mengganti password
    if (!profile.must_change_password) {
      return NextResponse.json(
        {
          success: false,
          message: "Pengguna tidak diwajibkan mengganti password sementara.",
        },
        { status: 403 }
      );
    }

    // 6. Ubah password melalui Supabase Auth
    const { error: passwordError } =
      await supabase.auth.updateUser({
        password: newPassword,
      });

    if (passwordError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengubah password.",
        },
        { status: 400 }
      );
    }

    // 7. Tandai bahwa pengguna sudah mengganti password
    const { error: updateProfileError } = await supabase
      .from("profiles")
      .update({
        must_change_password: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateProfileError) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password sudah berubah, tetapi status profil gagal diperbarui. Silakan hubungi administrator.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Password berhasil diubah.",
        data: {
          must_change_password: false,
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
    console.error("Change password error:", error);

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
