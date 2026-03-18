export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Callao</h1>
        <p className="mt-2 text-gris">
          Reserva tu mesa en la discoteca del Hotel Aristi, Cali.
        </p>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-medium text-white">Reserva pública (demo)</h2>
        <ol className="mt-4 space-y-3 text-sm text-gris">
          <li>
            <span className="font-medium text-white">1.</span> Fecha, hora y pax
          </li>
          <li>
            <span className="font-medium text-white">2.</span> Mapa interactivo de mesas
          </li>
          <li>
            <span className="font-medium text-white">3.</span> Datos del cliente
          </li>
        </ol>
      </section>
    </main>
  );
}

