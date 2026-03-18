// Middleware de Supabase para mantener la sesión (cookies) actualizada.
// Se ejecuta en el Edge y sincroniza la sesión de auth.
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isValidHttpUrl = (value: string | undefined): value is string =>
    !!value && /^https?:\/\//i.test(value.trim());

  // Si el dev aún no tiene configuradas las variables reales (p.ej. "..."),
  // evitamos que el middleware reviente la app.
  if (isValidHttpUrl(supabaseUrl) && !!supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
        }
      }
    });

    // Dispara una lectura/refresh de la sesión para que las cookies queden sincronizadas.
    await supabase.auth.getSession();
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

