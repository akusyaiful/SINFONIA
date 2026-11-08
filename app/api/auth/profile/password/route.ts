
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/authorization";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const ALLOWED_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
] as const;

export async function PATCH(request: Request) {
  try {
    // 1. Validasi autentikasi, status akun, dan role
    const auth = await requireRole([...ALLOWED_ROLES]);

    if (!auth.authorized) {
      return auth.response;
    }

    const { supabase, user } = auth;

    // 2. Baca request body
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
          message: "Data yang dikirim tidak valid.",
        },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    // 3. Validasi field yang diperbolehkan
    const allowedFields = [
      "current_password",
      "new_password",
      "confirm_password",
    ];

    const invalidFields = Object.keys(input).filter(
      (key) => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Terdapat field yang tidak diperbolehkan.",
          invalidFields,
        },
        { status: 400 }
      );
    }

    if (Object.keys(input).length !== 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field password wajib diisi.",
        },
        { status: 400 }
      );
    }

    // 4. Validasi tipe data password
    const currentPassword = input.current_password;
    const newPassword = input.new_password;
    const confirmPassword = input.confirm_password;

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua password harus berupa teks.",
        },
        { status: 400 }
      );
    }

    // 5. Validasi password kosong
    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field password wajib diisi.",
        },
        { status: 400 }
      );
    }

    // 6. Validasi panjang password baru
    if (newPassword.length < 8 || newPassword.length > 72) {
      return NextResponse.json(
        {
          success: false,
          message: "Password baru harus terdiri dari 8–72 karakter.",
        },
        { status: 400 }
      );
    }

    // 7. Validasi konfirmasi password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Konfirmasi password baru tidak cocok.",
        },
        { status: 400 }
      );
    }

    // 8. Pastikan password baru berbeda dari password lama
    if (newPassword === currentPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password baru harus berbeda dari password lama.",
        },
        { status: 400 }
      );
    }

    // 9. Pastikan email pengguna tersedia
    if (!user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email pengguna tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    // 10. Buat client sementara untuk verifikasi password lama
    const verifyClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }
    );

    // 11. Verifikasi password lama
    const {
      data: verifiedUser,
      error: verifyError,
    } = await verifyClient.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (
      verifyError ||
      !verifiedUser.user ||
      verifiedUser.user.id !== user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Password lama yang dimasukkan tidak benar.",
        },
        { status: 400 }
      );
    }

    // 12. Perbarui password menggunakan session utama
    const { error: updatePasswordError } =
      await supabase.auth.updateUser({
        password: newPassword,
      });

    if (updatePasswordError) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal memperbarui password.",
        },
        { status: 400 }
      );
    }

    // 13. Perbarui status pergantian password
    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        must_change_password: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (profileUpdateError) {
      console.error(
        "Gagal memperbarui status password:",
        profileUpdateError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Password berhasil diubah, tetapi status profil gagal diperbarui.",
        },
        { status: 500 }
      );
    }

    // 14. Kirim response berhasil
    return NextResponse.json(
      {
        success: true,
        message: "Password berhasil diperbarui.",
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
