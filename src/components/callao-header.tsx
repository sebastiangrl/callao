"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type HTMLAttributes
} from "react";

import {
  CALLAO_INSTAGRAM_URL,
  CALLAO_MAPS_URL
} from "@/config/site";

function receiptZigTopPath(teeth: number, W: number, H: number) {
  const s = W / teeth;
  let d = `M0,${H}`;
  for (let i = 0; i < teeth; i++) {
    d += ` L${i * s + s / 2},0 L${(i + 1) * s},${H}`;
  }
  d += ` L${W},${H} L${W},${H + 0.5} L0,${H + 0.5} Z`;
  return d;
}

function receiptZigBottomPath(teeth: number, W: number, H: number) {
  const s = W / teeth;
  let d = "M0,0";
  for (let i = 0; i < teeth; i++) {
    d += ` L${i * s + s / 2},${H} L${(i + 1) * s},0`;
  }
  d += ` L${W},0 Z`;
  return d;
}

function ReceiptZigTop({ className }: { className?: string }) {
  const W = 280;
  const H = 6;
  const teeth = 28;
  return (
    <svg
      viewBox={`0 0 ${W} ${H + 0.5}`}
      className={["block w-full text-[#151210]", className ?? ""].join(" ")}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d={receiptZigTopPath(teeth, W, H)} />
    </svg>
  );
}

function ReceiptZigBottom({ className }: { className?: string }) {
  const W = 280;
  const H = 6;
  const teeth = 28;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={["block w-full text-[#151210]", className ?? ""].join(" ")}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d={receiptZigBottomPath(teeth, W, H)} />
    </svg>
  );
}

function NavReceiptCard() {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[min(100%,20rem)] perspective-[1000px] sm:max-w-[22rem]",
        "lg:mx-0 lg:shrink-0"
      ].join(" ")}
    >
      <div
        className={[
          "origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-rotate-2 hover:scale-[1.02]",
          "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:rotate-0"
        ].join(" ")}
      >
        <ReceiptZigTop className="h-2.5 sm:h-3" />
        <div
          className={[
            "border-x border-white/[0.08] bg-[#151210] px-6 py-7 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65)]",
            "sm:px-7 sm:py-8"
          ].join(" ")}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            Horarios
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Jueves a domingo
            <br />
            <span className="text-white/50">Consulta redes para cada noche</span>
          </p>

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-white/40">
            Dirección
          </p>
          <a
            href={CALLAO_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm leading-snug text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#FE0000] hover:decoration-[#FE0000]/50"
          >
            Hotel Aristi · Cali
          </a>

          <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-white/40">
            Síguenos
          </p>
          <a
            href={CALLAO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-[#FE0000]"
          >
            <Instagram className="h-4 w-4 shrink-0 opacity-90" strokeWidth={1.5} />
            Instagram
          </a>
        </div>
        <ReceiptZigBottom className="h-2.5 sm:h-3" />
      </div>
    </div>
  );
}

const navLinkClass = [
  "block w-max max-w-full [overflow-wrap:anywhere] font-normal text-white/92 transition-colors duration-300",
  "text-[clamp(1.75rem,9vw,3.25rem)] leading-[1.05] tracking-tight",
  "hover:text-[#FE0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE0000]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080503]"
].join(" ");

const SCROLL_MENU_THRESHOLD_PX = 72;

function MenuToggleGlyph({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-[14px] w-[26px] flex-col justify-between"
      aria-hidden
    >
      <span
        className={[
          "h-0.5 w-full origin-center rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "translate-y-[7px] rotate-45"
            : "group-hover:-translate-y-px group-hover:ml-auto group-hover:w-[82%]"
        ].join(" ")}
      />
      <span
        className={[
          "h-0.5 w-full origin-center rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "scale-x-0 opacity-0"
            : "group-hover:scale-x-[0.32] group-hover:opacity-60"
        ].join(" ")}
      />
      <span
        className={[
          "h-0.5 w-full origin-center rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "-translate-y-[7px] -rotate-45"
            : "group-hover:translate-y-px group-hover:w-[82%]"
        ].join(" ")}
      />
    </span>
  );
}

type CallaoHeaderProps = HTMLAttributes<HTMLElement> & {
  onReserve?: () => void;
};

export default function CallaoHeader({
  onReserve,
  className,
  ...props
}: CallaoHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const titleId = useId();
  const closeNav = useCallback(() => setOpen(false), []);

  const showMenuTrigger = scrolled || open;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_MENU_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeNav]);

  const onReservas = () => {
    closeNav();
    onReserve?.();
  };

  return (
    <>
      <header
        {...props}
        className={[
          "fixed inset-x-0 top-0 z-[200] flex items-center justify-center px-5 py-4 md:px-8",
          className ?? ""
        ].join(" ")}
      >
        <Link
          href="/"
          className={[
            "flex items-center focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[#FE0000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080503]"
          ].join(" ")}
          onClick={closeNav}
        >
          <img
            src="/identity/callao-icon.svg"
            alt="Callao"
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {showMenuTrigger ? (
          <button
            type="button"
            className={[
              "group absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white",
              "transition-opacity duration-300 ease-out md:right-8",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FE0000]/50",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[#080503]"
            ].join(" ")}
            aria-expanded={open}
            aria-controls="site-nav-overlay"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuToggleGlyph open={open} />
          </button>
        ) : null}
      </header>

      {open ? (
        <div
          id="site-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={[
            "fixed inset-0 z-[199] overflow-y-auto overflow-x-hidden bg-[#080503]",
            "pt-[4.5rem] pb-12 md:pt-20 md:pb-16"
          ].join(" ")}
        >
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(254,0,0,0.06),transparent_55%)]"
          />

          <div
            className={[
              "relative mx-auto flex min-h-[min(100%,calc(100dvh-5rem))] max-w-6xl flex-col gap-12 px-5 md:gap-16 md:px-10",
              "lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:px-12"
            ].join(" ")}
          >
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <p id={titleId} className="sr-only">
                Navegación Callao
              </p>
              <nav className="flex flex-col gap-1 sm:gap-2" aria-label="Principal">
                <a href="#eventos" className={navLinkClass} onClick={closeNav}>
                  Eventos
                </a>
                <a href="#menu" className={navLinkClass} onClick={closeNav}>
                  Menú
                </a>
                <a
                  href={CALLAO_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass}
                  onClick={closeNav}
                >
                  Instagram
                </a>
                <button
                  type="button"
                  className={`${navLinkClass} text-left`}
                  onClick={onReservas}
                >
                  Reservas
                </button>
              </nav>

              <div className="mt-10 flex items-center gap-4 border-t border-white/[0.08] pt-8">
                <a
                  href={CALLAO_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 transition-colors hover:text-[#FE0000]"
                  aria-label="Instagram Callao"
                >
                  <Instagram className="h-5 w-5" strokeWidth={1.35} />
                </a>
              </div>
            </div>

            <NavReceiptCard />
          </div>
        </div>
      ) : null}
    </>
  );
}
