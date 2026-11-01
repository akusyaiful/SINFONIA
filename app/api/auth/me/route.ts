import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Memvalidasi session pengguna ke Supabase Auth
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "Pengguna belum login atau session tidak valid.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      message: "Session pengguna valid.",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}
