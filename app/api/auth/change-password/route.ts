
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { newPassword, confirmPassword } = body;

    // 1. Validasi input
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password baru dan konfirmasi wajib diisi.",
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

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password minimal 8 karakter.",
        },
        { status: 400 }
      );
    }

    // 2. Periksa session pengguna
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

    // 3. Ubah password melalui Supabase Auth
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

    // 4. Tandai bahwa pengguna sudah mengganti password
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        must_change_password: false,
      })
      .eq("id", user.id);

    if (profileError) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password sudah berubah, tetapi status profil gagal diperbarui. Silakan hubungi administrator.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password berhasil diubah.",
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
