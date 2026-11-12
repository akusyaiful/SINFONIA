
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/authorization";

const ALLOWED_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
] as const;

export async function GET() {
  try {
    // 1. Validasi autentikasi dan otorisasi
    const auth = await requireRole([...ALLOWED_ROLES]);

    if (!auth.authorized) {
      return auth.response!;
    }

    const { supabase, user } = auth;

    // 2. Ambil data profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone, avatar_url, must_change_password, is_active, created_at, updated_at"
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

    // 3. Kirim response
    return NextResponse.json(
      {
        success: true,
        message: "Data profil berhasil diambil.",
        data: {
          profile: {
            ...profile,
            email: user.email ?? profile.email,
          },
          roles: auth.roles,
        },
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Get profile error:", error);

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

export async function PATCH(request: Request) {
  try {
    // 1. Validasi autentikasi dan otorisasi
    const auth = await requireRole([...ALLOWED_ROLES]);

    if (!auth.authorized) {
      return auth.response!;
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
    const allowedFields = ["full_name", "phone"];

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

    if (Object.keys(input).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak ada data yang dikirim untuk diperbarui.",
        },
        { status: 400 }
      );
    }

    // 4. Validasi nilai masing-masing field
    const updates: {
      full_name?: string;
      phone?: string | null;
    } = {};

    if ("full_name" in input) {
      if (
        typeof input.full_name !== "string" ||
        input.full_name.trim().length === 0 ||
        input.full_name.trim().length > 150
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Nama lengkap wajib diisi dan maksimal 150 karakter.",
          },
          { status: 400 }
        );
      }

      updates.full_name = input.full_name.trim();
    }

    if ("phone" in input) {
      if (
        input.phone !== null &&
        (typeof input.phone !== "string" ||
          input.phone.trim().length > 30)
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Nomor telepon tidak valid.",
          },
          { status: 400 }
        );
      }

      updates.phone =
        typeof input.phone === "string" && input.phone.trim() !== ""
          ? input.phone.trim()
          : null;
    }

    // 5. Update profil pengguna
    const { data: updatedProfile, error: updateError } =
      await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select(
          "id, full_name, email, phone, avatar_url, must_change_password, is_active, created_at, updated_at"
        )
        .single();

    if (updateError) {
      console.error("Update profile error:", updateError);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal memperbarui profil pengguna.",
        },
        { status: 500 }
      );
    }

    // 6. Kirim response
    return NextResponse.json(
      {
        success: true,
        message: "Profil berhasil diperbarui.",
        data: {
          ...updatedProfile,
          email: user.email ?? updatedProfile.email,
        },
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Patch profile error:", error);

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
