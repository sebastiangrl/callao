import { redirect } from "next/navigation";

import { isAdminUser } from "@/lib/admin/auth";

export default async function AdminPage() {
  const ok = await isAdminUser();
  if (!ok) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#080503] text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <h1 className="text-3xl font-semibold">Dashboard Admin</h1>
        <p className="text-white/70">
          Próximamente: gestión del mapa, bloqueo de días y estadísticas.
        </p>
      </main>
    </div>
  );
}

