import type { HTMLAttributes } from "react";

export type PastEventTicket = {
  id: string;
  dateLabel: string;
  title: string;
  artists: string[];
  featured?: boolean;
  /** Imagen de portada si no hay `coverVideo`; opcional como poster del video */
  coverImage?: string;
  /** Si existe, sustituye la imagen (p. ej. `/videos/evento-balvin.mp4`) */
  coverVideo?: string;
};

const PAST_EVENTS: PastEventTicket[] = [
  {
    id: "jbalvin-mar-2026",
    dateLabel: "Marzo 2026",
    title: "J Balvin en Callao",
    artists: ["J Balvin"],
    featured: true,
    coverVideo: "/videos/evento-balvin.mp4"
  },
  {
    id: "feria-cali",
    dateLabel: "Diciembre 2025",
    title: "Feria de Cali",
    artists: ["Zion", "Reykon", "Greicy", "Pipe Bueno", "Nacho", "DJ invitado"],
    coverVideo: "/videos/evento-2.mp4"
  },
  {
    id: "noche-dorada",
    dateLabel: "Noviembre 2025",
    title: "Noche dorada",
    artists: ["Residente", "B2B", "Closing set"],
    coverVideo: "/videos/evento-3.mp4"
  },
  {
    id: "primer-acto",
    dateLabel: "Septiembre 2025",
    title: "Primer acto",
    artists: ["Lineup invitado", "Opening set"],
    coverVideo: "/videos/evento-4.mp4"
  },
  {
    id: "perro-negro-experiences",
    dateLabel: "Octubre 2025",
    title: "Perro Negro Experiences",
    artists: ["Perro Negro Experiences", "Guest DJs"],
    coverVideo: "/videos/evento-5.mp4"
  },
  {
    id: "bacchanalia",
    dateLabel: "Enero 2026",
    title: "Bacchanalia",
    artists: ["All night", "House & techno"],
    coverVideo: "/videos/evento-6.mp4"
  },
  {
    id: "endless-rhythm",
    dateLabel: "Agosto 2025",
    title: "Endless rhythm",
    artists: ["Endless rhythm", "After hours"],
    coverVideo: "/videos/evento-7.mp4"
  },
  {
    id: "sunset-session",
    dateLabel: "Julio 2025",
    title: "Sunset session",
    artists: ["Sunset session", "Warm-up"],
    coverVideo: "/videos/evento-8.mp4"
  }
];

const MAX_ARTISTS_VISIBLE = 5;

const TICKET_INNER_W = 540;
const TICKET_IMAGE_W = 313;
const TICKET_LINEUP_W = 226;

const DEFAULT_SECTION_BG =
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1920&q=80";

function EventCoverMedia({
  event,
  className
}: {
  event: PastEventTicket;
  className: string;
}) {
  if (event.coverVideo) {
    return (
      <video
        src={event.coverVideo}
        className={className}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        {...(event.coverImage ? { poster: event.coverImage } : {})}
        aria-hidden
      />
    );
  }
  return (
    <img src={event.coverImage ?? ""} alt="" className={className} />
  );
}

function TicketCard({ event }: { event: PastEventTicket }) {
  const visible = event.artists.slice(0, MAX_ARTISTS_VISIBLE);
  const extra = Math.max(0, event.artists.length - MAX_ARTISTS_VISIBLE);

  return (
    <article
      tabIndex={0}
      className={[
        "group relative flex h-full min-h-0 shrink-0 snap-start overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#FE0000]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080503]",
        "max-w-[min(100%,540px)] flex-col md:min-h-0",
        /* Ancho = área útil − gap (gap-5) − asomo ~48px del ticket siguiente */
        "w-[min(540px,calc(100vw-2rem-1.25rem-48px))]",
        "border border-white/[0.14] bg-white/[0.06] backdrop-blur-md",
        "transition-[border-color,box-shadow,width,min-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-white/[0.22] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)] focus-within:border-white/[0.22] focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        event.featured
          ? "border-[#FE0000]/35 shadow-[0_0_36px_-14px_rgba(254,0,0,0.5)] hover:shadow-[0_0_48px_-12px_rgba(254,0,0,0.55)] focus-within:shadow-[0_0_48px_-12px_rgba(254,0,0,0.55)]"
          : "",
        "md:w-[152px] md:min-w-[152px] md:max-w-[540px] md:hover:w-[540px] md:hover:min-w-[540px] md:focus-within:w-[540px] md:focus-within:min-w-[540px]"
      ].join(" ")}
    >
      {/* Perforación */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[58%] top-0 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#080503] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-[58%] bottom-0 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/15 bg-[#080503] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:block"
      />

      {/* Móvil: ticket completo, altura del carril */}
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        <div className="relative min-h-0 flex-[3] overflow-hidden">
          <EventCoverMedia
            event={event}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080503]/90 via-transparent to-black/30" />
        </div>
        <div className="flex min-h-0 w-full min-w-0 shrink-0 flex-[2] flex-col gap-4 overflow-y-auto overscroll-contain px-4 pb-4 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/45">
              {event.dateLabel}
            </p>
            <h3
              className={[
                "mt-2 max-w-full text-white [overflow-wrap:anywhere]",
                "text-[clamp(1.125rem,4.2vw,1.625rem)] font-normal leading-[1.18] tracking-tight"
              ].join(" ")}
            >
              {event.title}
            </h3>
          </div>

          <div className="min-w-0 border-t border-white/[0.08] pt-3">
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              Lineup
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {visible.map((name) => (
                <li
                  key={`${event.id}-${name}`}
                  className={[
                    "max-w-full rounded-none border border-white/[0.12] bg-white/[0.06]",
                    "px-2 py-0.5 text-[10px] leading-snug text-white/85 [overflow-wrap:anywhere]"
                  ].join(" ")}
                >
                  {name}
                </li>
              ))}
              {extra > 0 ? (
                <li className="rounded-none border border-white/[0.08] bg-transparent px-2 py-0.5 text-[10px] text-white/45">
                  +{extra}
                </li>
              ) : null}
            </ul>
          </div>

          <p className="text-[10px] uppercase tracking-[0.32em] text-[#FE0000]/90">
            Callao
          </p>
        </div>
      </div>

      {/* Desktop: interior fijo, clip horizontal */}
      <div
        className="hidden h-full min-h-0 md:block"
        style={{ width: TICKET_INNER_W }}
      >
        <div className="flex h-full w-full min-h-0">
          <div
            className="relative h-full shrink-0 overflow-hidden"
            style={{ width: TICKET_IMAGE_W }}
          >
            <EventCoverMedia
              event={event}
              className="h-full w-full object-cover object-left opacity-90 transition-transform duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

            <div className="absolute inset-y-0 left-0 flex w-[152px] flex-col items-center justify-between bg-black/25 py-10 text-center transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
              <p className="px-1 text-[9px] uppercase leading-tight tracking-[0.18em] text-white/55">
                {event.dateLabel}
              </p>
              <h3
                className="max-h-[min(320px,60vh)] overflow-hidden text-[13px] font-normal uppercase leading-snug tracking-[0.14em] text-white [writing-mode:vertical-rl] [text-orientation:mixed]"
                title={event.title}
              >
                {event.title}
              </h3>
              <span className="text-[10px] text-[#FE0000]/90">●</span>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-7 pl-[140px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                {event.dateLabel}
              </p>
              <h3 className="mt-2 text-3xl leading-tight text-white drop-shadow-md">
                {event.title}
              </h3>
              <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-[#FE0000]/95">
                Callao
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="h-full w-0 shrink-0 border-l border-dashed border-white/20"
          />

          <div
            className="flex h-full shrink-0 flex-col justify-center gap-3 py-10 pl-4 pr-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            style={{ width: TICKET_LINEUP_W }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Lineup
            </p>
            <ul className="flex flex-wrap gap-2">
              {visible.map((name) => (
                <li
                  key={`${event.id}-d-${name}`}
                  className="rounded-none border border-white/[0.12] bg-white/[0.06] px-2.5 py-1 text-xs leading-snug text-white/85"
                >
                  {name}
                </li>
              ))}
              {extra > 0 ? (
                <li className="rounded-none border border-white/[0.08] bg-transparent px-2.5 py-1 text-xs text-white/45">
                  +{extra}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

type PastEventsTicketsProps = HTMLAttributes<HTMLElement> & {
  events?: PastEventTicket[];
  /** Imagen de fondo de la sección */
  sectionBackgroundImage?: string;
};

export default function PastEventsTickets({
  events = PAST_EVENTS,
  sectionBackgroundImage = DEFAULT_SECTION_BG,
  className,
  ...props
}: PastEventsTicketsProps) {
  return (
    <section
      {...props}
      id="eventos"
      className={[
        "relative flex h-[100dvh] max-h-[100dvh] shrink-0 flex-col overflow-hidden border-t border-white/[0.06]",
        className ?? ""
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#080503]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.38]"
        style={{ backgroundImage: `url(${sectionBackgroundImage})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#080503] via-[#080503]/90 to-[#080503]"
      />
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-[2px]"
      />

      <div className="relative z-[1] flex h-full min-h-0 flex-col px-4 pt-24 pb-4 md:px-6 md:pt-24 md:pb-5">
        <h2 className="shrink-0 text-3xl leading-tight tracking-tight text-white md:text-4xl">
          Coma Callao
        </h2>

        <div className="relative mt-4 min-h-0 flex-1 md:mt-5">
          <div
            className={[
              "flex h-full min-h-0 items-stretch gap-5 overflow-x-auto overflow-y-hidden",
              "snap-x snap-mandatory scroll-ps-0 scroll-pe-4 [-webkit-overflow-scrolling:touch]",
              "md:snap-none md:scroll-p-0"
            ].join(" ")}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) transparent"
            }}
          >
            {events.map((event) => (
              <TicketCard key={event.id} event={event} />
            ))}
            <div
              aria-hidden
              className="w-2 shrink-0 snap-start md:w-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
