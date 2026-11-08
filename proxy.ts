
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 1. Validasi session
  const {
    data: { claims },
    error: authError,
  } = await supabase.auth.getClaims();

  const isAuthenticated = !authError && !!claims?.sub;

  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/forgot-password";

  const isChangePasswordPage =
    pathname === "/change-password";

  // 2. Pengguna belum login
  if (!isAuthenticated) {
    if (isAuthPage) {
      return supabaseResponse;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 3. Ambil profil pengguna
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_active, must_change_password")
    .eq("id", claims.sub)
    .maybeSingle();

  if (profileError || !profile || !profile.is_active) {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL("/login?error=account-unavailable", request.url)
    );
  }

  // 4. Wajib mengganti password sementara
  if (profile.must_change_password) {
    if (isChangePasswordPage) {
      return supabaseResponse;
    }

    return NextResponse.redirect(
      new URL("/change-password", request.url)
    );
  }

  // 5. Pengguna yang sudah login tidak perlu kembali ke halaman login
  if (isAuthPage || isChangePasswordPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api|.*\\.(?:ico|css|js|map)$).*)",
  ],
};
