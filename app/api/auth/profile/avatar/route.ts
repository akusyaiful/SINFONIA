
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/authorization";

const ALLOWED_ROLES = [
  "admin",
  "teacher",
  "student",
  "parent",
] as const;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function extractAvatarPath(
  avatarUrl: string,
  userId: string
): string | null {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      return null;
    }

    const url = new URL(avatarUrl);
    const expectedOrigin = new URL(supabaseUrl).origin;

    if (url.origin !== expectedOrigin) {
      return null;
    }

    const marker = "/storage/v1/object/public/avatars/";

    if (!url.pathname.includes(marker)) {
      return null;
    }

    const markerIndex = url.pathname.indexOf(marker);

    const path = decodeURIComponent(
      url.pathname.substring(markerIndex + marker.length)
    );

    if (
      !path.startsWith(`${userId}/`) ||
      path.includes("..") ||
      path.includes("\\")
    ) {
      return null;
    }

    return path;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    // 1. Validasi autentikasi dan role
    const auth = await requireRole([...ALLOWED_ROLES]);

    if (!auth.authorized) {
      return auth.response!;
    }

    const { supabase, user } = auth;

    // 2. Ambil profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
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

    // 3. Ambil path avatar lama jika valid
    const oldAvatarPath = profile.avatar_url
      ? extractAvatarPath(profile.avatar_url, user.id)
      : null;

    // 4. Ambil file dari FormData
    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Format upload tidak valid.",
        },
        { status: 400 }
      );
    }

    const file = formData.get("avatar");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "File foto profil wajib diunggah.",
        },
        { status: 400 }
      );
    }

    // 5. Validasi ukuran file
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Ukuran foto maksimal 2 MB.",
        },
        { status: 400 }
      );
    }

    // 6. Validasi tipe file
    const extension = ALLOWED_TYPES[file.type];

    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          message: "Format foto harus JPG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    // 7. Buat nama file unik
    const fileName = `${user.id}/${crypto.randomUUID()}.${extension}`;

    // 8. Upload ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengunggah foto profil.",
        },
        { status: 500 }
      );
    }

    // 9. Ambil URL publik
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const avatarUrl = publicUrlData.publicUrl;

    // 10. Simpan URL ke tabel profiles
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("id, full_name, avatar_url, updated_at")
      .maybeSingle();

    if (updateError || !updatedProfile) {
      // Rollback upload jika update database gagal
      const { error: rollbackError } = await supabase.storage
        .from("avatars")
        .remove([fileName]);

      if (rollbackError) {
        console.error("Avatar rollback error:", rollbackError);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Gagal menyimpan foto profil.",
        },
        { status: 500 }
      );
    }

    // 11. Hapus avatar lama jika tersedia
    if (oldAvatarPath && oldAvatarPath !== fileName) {
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([oldAvatarPath]);

      if (deleteError) {
        console.error("Gagal menghapus avatar lama:", deleteError);
      }
    }

    // 12. Kirim response
    return NextResponse.json(
      {
        success: true,
        message: "Foto profil berhasil diperbarui.",
        data: updatedProfile,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Avatar upload error:", error);

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

export async function DELETE() {
  try {
    // 1. Validasi autentikasi dan role
    const auth = await requireRole([...ALLOWED_ROLES]);

    if (!auth.authorized) {
      return auth.response!;
    }

    const { supabase, user } = auth;

    // 2. Ambil profil pengguna
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("avatar_url")
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

    // 3. Periksa avatar
    if (!profile.avatar_url) {
      return NextResponse.json(
        {
          success: false,
          message: "Pengguna belum memiliki foto profil.",
        },
        { status: 404 }
      );
    }

    // 4. Validasi path avatar
    const avatarPath = extractAvatarPath(
      profile.avatar_url,
      user.id
    );

    if (!avatarPath) {
      return NextResponse.json(
        {
          success: false,
          message: "URL foto profil tidak valid atau akses tidak diizinkan.",
        },
        { status: 403 }
      );
    }

    // 5. Lepaskan URL avatar dari profil
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("id")
      .maybeSingle();

    if (updateError || !updatedProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal memperbarui data profil.",
        },
        { status: 500 }
      );
    }

    // 6. Hapus file dari Supabase Storage
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove([avatarPath]);

    if (deleteError) {
      console.error("Avatar deletion error:", deleteError);

      return NextResponse.json(
        {
          success: false,
          message: "Avatar dilepas dari profil, tetapi file gagal dihapus.",
        },
        { status: 500 }
      );
    }

    // 7. Kirim response
    return NextResponse.json(
      {
        success: true,
        message: "Foto profil berhasil dihapus.",
        data: {
          avatar_url: null,
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
    console.error("Avatar deletion error:", error);

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
