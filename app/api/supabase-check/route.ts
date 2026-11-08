
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Periksa koneksi database
    const { error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);

      return NextResponse.json(
        {
          connected: false,
          message: "Supabase database gagal diakses.",
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // 2. Response berhasil
    return NextResponse.json(
      {
        connected: true,
        message: "Supabase database berhasil diakses!",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Supabase check error:", error);

    return NextResponse.json(
      {
        connected: false,
        message: "Terjadi kesalahan saat mengakses Supabase.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
