"use client";

import { LayoutGrid } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes
} from "react";

const MENU_CATEGORIES = [
  "Platos pequeños",
  "Ceviches & Tiraditos",
  "Platos Grandes",
  "Acompañamientos",
  "Postres"
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export type MenuPreviewItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: string;
  image: string;
};

/** Archivo en `public/menu/platos pequeños/` (nombre exacto del disco). */
function imgPlatoPequeño(file: string) {
  return encodeURI(`/menu/platos pequeños/${file}`);
}

/** Archivo en `public/menu/ceviches y tiraditos/`. */
function imgCevicheTiradito(file: string) {
  return encodeURI(`/menu/ceviches y tiraditos/${file}`);
}

/** Ñ en el archivo del disco es N + tilde combinante (NFC distinto). */
const FILE_NOQUIS = "N\u0303OQUIS DE PLATANO.webp";

export const MENU_ALL_ITEMS: MenuPreviewItem[] = [
  {
    id: "papas-trufadas",
    category: "Platos pequeños",
    name: "Papas trufadas",
    description:
      "Papas trufadas acompañadas con queso parmesano y salsa bernesa con estragón.",
    price: "$ 37.000",
    image: imgPlatoPequeño("PAPAS TRUFADAS.webp")
  },
  {
    id: "mini-carpaccio-lomo",
    category: "Platos pequeños",
    name: "Mini carpaccio de lomo",
    description:
      "Finas lonjas de lomo viche, salsa ponzu, mantequilla avellanada y queso parmesano.",
    price: "$ 15.000",
    image: imgPlatoPequeño("MINI CARPACCIO DE LOMO.webp")
  },
  {
    id: "envueltos-platano",
    category: "Platos pequeños",
    name: "Envueltos de plátano",
    description:
      "Wonton relleno de plátano maduro y queso costeño acompañado de ají de bocadillo. (5 und)",
    price: "$ 34.000",
    image: imgPlatoPequeño("ENVUELTOS DE PLATANO.webp")
  },
  {
    id: "marranitas-cerdo",
    category: "Platos pequeños",
    name: "Marranitas de cerdo",
    description:
      "Plátano pintón relleno con tocino cocido a baja temperatura, acompañado con ají de aguacate y chicharrón suflado.",
    price: "$ 37.000",
    image: imgPlatoPequeño("MARRANITAS DE CERDO.webp")
  },
  {
    id: "noquis-platano",
    category: "Platos pequeños",
    name: "Ñoquis de plátano",
    description:
      "Ñoquis de plátano maduro, espuma de quesos, miel de plátano, pasta de hongos. Terminados con aceite de trufa y queso paipa rallado.",
    price: "$ 34.000",
    image: imgPlatoPequeño(FILE_NOQUIS)
  },
  {
    id: "camarones-tikka",
    category: "Platos pequeños",
    name: "Camarones tikka massala",
    description:
      "Camarones apanados en hojuelas de maíz con salsa tikka massala.",
    price: "$ 45.000",
    image: imgPlatoPequeño("CAMARONES TIKKA MASSALA.webp")
  },
  {
    id: "gyosas-cerdo",
    category: "Platos pequeños",
    name: "Gyosas de cerdo",
    description:
      "Gyosas rellenas de guiso de cerdo y jengibre acompañadas con salsa de soya y guayaba fermentada. (5 und)",
    price: "$ 35.000",
    image: imgPlatoPequeño("GYOSAS DE CERDO.webp")
  },
  {
    id: "crispetas-coliflor",
    category: "Platos pequeños",
    name: "Crispetas de coliflor",
    description:
      "Crispetas de coliflor, reducción de naranja y jengibre, mayonesa de cilantro.",
    price: "$ 30.000",
    image: imgPlatoPequeño("CRISPETAS DE COLIFLOR.webp")
  },
  {
    id: "empanadas-jaiba",
    category: "Platos pequeños",
    name: "Empanadas de jaiba",
    description:
      "Masa de maíz blanco achiotado, rellena con guiso de jaiba acompañada de ají de piña (5 und tipo cóctel).",
    price: "$ 34.000",
    image: imgPlatoPequeño("EMPANADAS DE JAIBA.webp")
  },
  {
    id: "empanadas-pipian",
    category: "Platos pequeños",
    name: "Empanadas de pipián",
    description:
      "Empanadas de maíz amarillo rellenas de guiso de pipián, acompañadas con ají de piña (5 und).",
    price: "$ 30.000",
    image: imgPlatoPequeño("EMPANADAS DE PIPIAN.webp")
  },
  {
    id: "tiradito-salmon",
    category: "Ceviches & Tiraditos",
    name: "Tiradito de salmón",
    description:
      "Láminas de salmón ahumado, acevichado de toronja y maracuyá, mix de lechugas asiáticas, almendras garrapiñadas y rábano sandía.",
    price: "$ 53.000",
    image: imgCevicheTiradito("TIRADITO DE SALMON.webp")
  },
  {
    id: "tiradito-atun",
    category: "Ceviches & Tiraditos",
    name: "Tiradito de atún",
    description: "Láminas de atún, trufa, ponzu y puerro frito.",
    price: "$ 48.000",
    image: imgCevicheTiradito("TIRADITO DE ATUN.webp")
  }
];

/** Solo platos pequeños (compatibilidad). */
export const MENU_PREVIEW_ITEMS: MenuPreviewItem[] = MENU_ALL_ITEMS.filter(
  (item) => item.category === "Platos pequeños"
);

/** Intervalo entre cambios automáticos de plato (ms). */
const MENU_PREVIEW_ROTATE_MS = 6000;

type MenuPreviewSectionProps = HTMLAttributes<HTMLElement> & {
  /** Si se omite, se usa el menú completo agrupado por categoría. */
  items?: MenuPreviewItem[];
};

export default function MenuPreviewSection({
  items: itemsProp,
  className,
  ...props
}: MenuPreviewSectionProps) {
  const sourceItems = itemsProp ?? MENU_ALL_ITEMS;
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Platos pequeños");
  const [selected, setSelected] = useState(0);
  const [desktopHover, setDesktopHover] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const thumbsScrollRef = useRef<HTMLUListElement>(null);

  const items = useMemo(
    () => sourceItems.filter((item) => item.category === activeCategory),
    [sourceItems, activeCategory]
  );

  const dish = items[selected] ?? items[0] ?? null;

  const onPickDish = useCallback((i: number) => {
    setSelected(i);
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [activeCategory]);

  useEffect(() => {
    const root = thumbsScrollRef.current;
    if (!root || items.length === 0) return;

    const scrollThumbIntoRail = () => {
      const btn = root.querySelector(`[data-thumb-idx="${selected}"]`);
      if (!(btn instanceof HTMLElement)) return;
      const li = btn.closest("li");
      const el = li instanceof HTMLElement ? li : btn;

      const rootRect = root.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const delta =
        elRect.left + elRect.width / 2 - (rootRect.left + rootRect.width / 2);
      const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
      const next = Math.min(
        maxScroll,
        Math.max(0, root.scrollLeft + delta)
      );
      root.scrollTo({ left: next, behavior: "smooth" });
    };

    const id = requestAnimationFrame(scrollThumbIntoRail);
    return () => cancelAnimationFrame(id);
  }, [selected, items.length, activeCategory]);

  useEffect(() => {
    if (!mobileCatOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-menu-cat-root]")) setMobileCatOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileCatOpen]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      setSelected((s) => (s + 1) % items.length);
    }, MENU_PREVIEW_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [selected, items]);

  const categoriesExpanded = desktopHover || mobileCatOpen;

  return (
    <section
      {...props}
      id="menu"
      className={[
        "relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-[#080503]",
        className ?? ""
      ].join(" ")}
    >
      {/* Banner principal */}
      <div className="absolute inset-0 bg-[#0a0604]">
        {items.length > 0 ? (
          items.map((item, i) => (
            <img
              key={item.id}
              src={item.image}
              alt=""
              className={[
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
                i === selected ? "opacity-100" : "opacity-0"
              ].join(" ")}
            />
          ))
        ) : null}
        {/* Único overlay sobre la foto: negro a la izquierda → transparente a la derecha */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black to-transparent"
          aria-hidden
        />
      </div>

      {/* Categorías: esquina superior derecha (hover desktop / tap móvil) */}
      <div
        data-menu-cat-root
        className="absolute right-4 top-[4.5rem] z-40 md:right-8 md:top-20"
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
            setDesktopHover(true);
          }
        }}
        onMouseLeave={() => setDesktopHover(false)}
      >
        <div className="flex flex-row items-start justify-end gap-3 md:items-center">
          <div
            className={[
              "overflow-hidden transition-[max-width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
              categoriesExpanded
                ? "max-w-[min(calc(100vw-5rem),22rem)]"
                : "max-w-0 pointer-events-none"
            ].join(" ")}
          >
            <nav
              id="menu-categories-panel"
              className={[
                "flex min-h-[48px] min-w-max flex-col items-end gap-2.5 border border-white/12 bg-[#080503]/90 py-3 pl-4 pr-4 backdrop-blur-md md:gap-3 md:py-3.5 md:pl-5 md:pr-4",
                "translate-x-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                categoriesExpanded
                  ? "translate-x-0 opacity-100"
                  : "max-md:hidden"
              ].join(" ")}
              aria-label="Categorías del menú"
            >
              {MENU_CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href="#menu"
                  className={[
                    "block w-max text-right text-[11px] uppercase leading-snug tracking-[0.18em] transition-colors md:text-[11px] md:tracking-[0.2em]",
                    cat === activeCategory
                      ? "text-[#FE0000]"
                      : "text-white/85 hover:text-[#FE0000]"
                  ].join(" ")}
                  aria-current={cat === activeCategory ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat);
                    setMobileCatOpen(false);
                  }}
                >
                  {cat}
                </a>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className="group/ham flex h-11 w-11 shrink-0 items-center justify-center bg-white/[0.08] text-white backdrop-blur-sm transition-colors hover:bg-white/[0.14] md:h-12 md:w-12"
            aria-expanded={categoriesExpanded}
            aria-controls="menu-categories-panel"
            aria-label="Ver categorías del menú"
            id="menu-categories-trigger"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
                setMobileCatOpen((o) => !o);
              }
            }}
          >
            <LayoutGrid className="h-5 w-5 opacity-95 md:h-[1.35rem] md:w-[1.35rem]" strokeWidth={1.35} />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-[1] flex h-full min-w-0 flex-col pb-6 pl-4 pr-4 pt-[4.75rem] md:px-10 md:pb-10 md:pt-[5.25rem] lg:px-14">
        <div className="grid min-h-0 flex-1 grid-cols-1 content-start">
          {/* Texto arriba — dejamos aire a la derecha para el detalle absoluto */}
          <div className="flex max-w-xl flex-col items-start justify-start pr-[min(12rem,28vw)] sm:pr-[min(14rem,30vw)] lg:max-w-2xl lg:pr-[min(18rem,34vw)]">
            {dish ? (
              <>
                <h2
                  key={dish.id}
                  className="text-4xl leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                  {dish.name}
                </h2>
                <p
                  key={`${dish.id}-d`}
                  className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:mt-6 md:text-base"
                >
                  {dish.description}
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-white md:mt-6 md:text-sm">
                  {dish.price}
                </p>
              </>
            ) : (
              <p className="max-w-sm text-sm leading-relaxed text-white/55 md:text-base">
                Pronto añadiremos platos en esta categoría.
              </p>
            )}
          </div>
        </div>

        {/* Miniaturas: carril horizontal (móvil y desktop si no caben en el ancho) */}
        {items.length > 0 ? (
          <div className="relative mt-auto min-h-0 w-full min-w-0 pt-6 md:pt-8">
            <ul
              ref={thumbsScrollRef}
              className={[
                "m-0 flex w-full list-none items-end gap-3 overflow-x-auto overflow-y-hidden p-0 pb-1",
                "snap-x snap-mandatory [-webkit-overflow-scrolling:touch]",
                "-mx-4 scroll-pl-4 scroll-pr-4 px-4 md:-mx-0 md:gap-4 md:scroll-pl-0 md:scroll-pr-0 md:px-0"
              ].join(" ")}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.2) transparent"
              }}
              aria-label="Platos de la categoría"
            >
              {items.map((item, i) => (
                <li key={item.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    data-thumb-idx={i}
                    onClick={() => onPickDish(i)}
                    className={[
                      "group/th relative h-16 w-16 overflow-hidden border transition-all duration-300",
                      "md:h-[4.5rem] md:w-[4.5rem]",
                      "hover:-translate-y-2 hover:shadow-lg active:translate-y-0",
                      i === selected
                        ? "border-[#FE0000] ring-2 ring-[#FE0000]/40"
                        : "border-white/20 opacity-90 hover:border-white/40 hover:opacity-100"
                    ].join(" ")}
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
                    }}
                    aria-label={`Ver ${item.name}`}
                    aria-current={i === selected ? "true" : undefined}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/th:scale-110"
                    />
                  </button>
                </li>
              ))}
              <li aria-hidden className="pointer-events-none w-2 shrink-0 md:w-0" />
            </ul>
          </div>
        ) : null}
      </div>

      {/* Detalle con zoom: centrado en el eje vertical de todo el banner (sección) */}
      {items.length > 0 ? (
        <div className="pointer-events-none absolute right-4 top-1/2 z-[2] -translate-y-1/2 sm:right-6 md:right-10 lg:right-12">
          <div className="relative h-44 w-[11rem] overflow-hidden border border-white/12 bg-[#0a0604] shadow-lg sm:h-52 sm:w-[13rem] lg:h-[min(42vh,340px)] lg:w-[min(42vw,280px)] lg:max-w-[280px]">
            {items.map((item, i) => (
              <img
                key={`z-${item.id}`}
                src={item.image}
                alt=""
                className={[
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
                  "scale-[2.35] object-[48%_38%]",
                  i === selected ? "opacity-100" : "opacity-0"
                ].join(" ")}
              />
            ))}
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              aria-hidden
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
