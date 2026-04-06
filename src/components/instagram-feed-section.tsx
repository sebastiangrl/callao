import { Instagram } from "lucide-react";
import type { HTMLAttributes } from "react";

import {
  CALLAO_INSTAGRAM_HANDLE,
  CALLAO_INSTAGRAM_URL
} from "@/config/site";

export { CALLAO_INSTAGRAM_HANDLE, CALLAO_INSTAGRAM_URL };

const INSTAGRAM_ASSET = (n: number) => `/temp/instagram/instagram-${n}.jpg`;

export type MockInstagramPost = {
  id: string;
  image: string;
  alt: string;
};

/** Capturas / export del feed (@callao______) en `public/temp/instagram/`. */
export const MOCK_INSTAGRAM_POSTS: MockInstagramPost[] = [
  { id: "ig1", image: INSTAGRAM_ASSET(1), alt: "Callao en Instagram" },
  { id: "ig2", image: INSTAGRAM_ASSET(2), alt: "Callao en Instagram" },
  { id: "ig3", image: INSTAGRAM_ASSET(3), alt: "Callao en Instagram" },
  { id: "ig4", image: INSTAGRAM_ASSET(4), alt: "Callao en Instagram" },
  { id: "ig5", image: INSTAGRAM_ASSET(5), alt: "Callao en Instagram" },
  { id: "ig6", image: INSTAGRAM_ASSET(6), alt: "Callao en Instagram" },
  { id: "ig7", image: INSTAGRAM_ASSET(7), alt: "Callao en Instagram" },
  { id: "ig8", image: INSTAGRAM_ASSET(8), alt: "Callao en Instagram" }
];

type InstagramFeedSectionProps = HTMLAttributes<HTMLElement> & {
  posts?: MockInstagramPost[];
  profileUrl?: string;
};

export default function InstagramFeedSection({
  posts = MOCK_INSTAGRAM_POSTS,
  profileUrl = CALLAO_INSTAGRAM_URL,
  className,
  ...props
}: InstagramFeedSectionProps) {
  return (
    <section
      {...props}
      id="instagram"
      className={[
        "relative min-h-[100dvh] shrink-0 border-t border-white/[0.06] bg-[#080503]",
        className ?? ""
      ].join(" ")}
    >
      <div className="relative z-[1] flex flex-col px-4 pt-24 pb-4 md:px-6 md:pt-24 md:pb-5">
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:gap-5">
          <div>
            <h2 className="text-3xl leading-tight tracking-tight text-white md:text-4xl">
              Callao en Instagram
            </h2>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "inline-flex shrink-0 items-center justify-center gap-2 self-start border border-white/[0.14]",
              "bg-white/[0.06] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md",
              "transition-[border-color,background-color] duration-300",
              "hover:border-white/[0.22] hover:bg-white/[0.08] sm:self-auto md:px-5 md:py-3"
            ].join(" ")}
          >
            <Instagram className="h-4 w-4 opacity-90" strokeWidth={1.5} aria-hidden />
            Ver perfil
          </a>
        </div>

        <div className="relative mt-4 md:mt-5">
          <ul
            className={[
              "grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3 sm:gap-x-2 sm:gap-y-2",
              "md:grid-cols-4 md:gap-x-2 md:gap-y-2"
            ].join(" ")}
          >
            {posts.map((post) => (
              <li key={post.id}>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "group relative block aspect-square w-full overflow-hidden",
                    "border border-white/[0.14] bg-white/[0.06] backdrop-blur-md",
                    "transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:border-white/[0.22] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  ].join(" ")}
                  aria-label={`Abrir Instagram de Callao — ${post.alt}`}
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
