"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { LockKeyhole, UserRound } from "lucide-react";

import BtnCallao from "@/components/btn-callao";

function isValidHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  return /^https?:\/\//i.test(value.trim());
}

export default function AdminLoginPage() {
  const router = useRouter();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!isValidHttpUrl(supabaseUrl) || !supabaseAnonKey) return null;
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError(
        "Supabase no configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    setLoading(true);
    try {
      // Nota: usamos "usuario" como email (Supabase requiere email).
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: usuario,
        password
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#080503]">
      <div className="mx-auto flex max-h-[100vh] h-[850px] max-w-[95vw] items-center justify-center px-4 overflow-hidden">
        <div className="flex h-full w-[1240px] flex-col items-center gap-6 overflow-hidden rounded-none bg-[rgba(6,6,6,0.85)] p-[32px_24px] text-white">
          {/* 2 columnas compactas: imagen a la izquierda y form a la derecha */}
          <div className="grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch min-h-0">
            <div className="flex h-full items-center justify-center overflow-hidden bg-black/20 p-3">
              <div className="relative h-full w-full max-w-[480px]">
                <img
                  src="/mock/mock-1.png"
                  alt="Callao admin"
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
                {/* Degradado: transparente -> negro (bottom) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              </div>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center min-h-0">
              <img
                src="/identity/Logo-Callao.svg"
                alt="Logo Callao"
                className="mb-4 h-16 w-auto"
                draggable={false}
              />

              <form
                onSubmit={onSubmit}
                className="flex w-full flex-col gap-6"
              >
                <div>
                  <label className="mb-2 block text-xs font-medium text-white/80">
                    Usuario
                  </label>
                  <div className="flex items-center gap-3 border-b border-white/70 pb-2 focus-within:border-white">
                    <UserRound className="h-5 w-5 text-white/70" />
                    <input
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      className="w-full bg-transparent border-0 px-0 py-1 text-sm text-white placeholder:text-white/30 outline-none"
                      placeholder="correo@dominio.com"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-white/80">
                    Contraseña
                  </label>
                  <div className="flex items-center gap-3 border-b border-white/70 pb-2 focus-within:border-white">
                    <LockKeyhole className="h-5 w-5 text-white/70" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-0 px-0 py-1 text-sm text-white placeholder:text-white/30 outline-none"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-none border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {error}
                  </div>
                )}

                <div className="flex w-full justify-center pt-1">
                  <BtnCallao
                    type="submit"
                    disabled={loading}
                    className="min-w-[220px]"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </BtnCallao>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

