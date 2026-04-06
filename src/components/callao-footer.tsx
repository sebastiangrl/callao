import Link from "next/link";
import type { HTMLAttributes } from "react";

import { CALLAO_INSTAGRAM_URL, CALLAO_MAPS_URL } from "@/config/site";

const linkClass =
  "text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 hover:text-[#FE0000] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FE0000]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080503]";

type CallaoFooterProps = HTMLAttributes<HTMLElement>;

export default function CallaoFooter({ className, ...props }: CallaoFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      {...props}
      className={[
        "border-t border-white/[0.06] bg-[#080503] text-white",
        className ?? ""
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-14 md:px-6 md:py-20">
        <Link
          href="/"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE0000]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080503]"
        >
          <img
            src="/identity/Logo-Callao.svg"
            alt="Callao"
            className="mx-auto h-auto w-[min(220px,72vw)] opacity-[0.96] md:w-[min(260px,55vw)]"
            width={260}
            height={146}
          />
        </Link>

        <a
          href={CALLAO_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hotel Aristi, Cali — abrir en Google Maps"
          className={[
            "mt-8 text-center text-[11px] uppercase tracking-[0.32em] text-white/38",
            "transition-colors duration-300 hover:text-[#FE0000]",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FE0000]/50",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-[#080503]"
          ].join(" ")}
        >
          Hotel Aristi · Cali
        </a>

        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          aria-label="Pie de página"
        >
          <a href="#eventos" className={linkClass}>
            Eventos
          </a>
          <a href="#menu" className={linkClass}>
            Menú
          </a>
          <a
            href={CALLAO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Instagram
          </a>
        </nav>

        <div
          className="mt-12 h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden
        />

        <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-white/28">
          © {year} Callao
        </p>
      </div>
    </footer>
  );
}
