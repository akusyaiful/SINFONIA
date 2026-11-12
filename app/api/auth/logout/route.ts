
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();

    // 1. Akhiri session Supabase
    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      console.error("Logout error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Gagal logout.",
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "private, no-store",
          },
        }
      );
    }

    // 2. Kirim response berhasil
    return NextResponse.json(
      {
        success: true,
        message: "Logout berhasil.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Logout server error:", error);

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
