"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

import BtnCallao from "./btn-callao";

type HeroBannerProps = HTMLAttributes<HTMLElement> & {
  ctaLabels?: [string, string, string];
  onReserve?: () => void;
};

export default function HeroBanner({
  className,
  ctaLabels = ["Reserva", "Zonas", "Contacto"],
  onReserve,
  ...props
}: HeroBannerProps) {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const logoVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onVis = () => {
      const hidden = document.visibilityState === "hidden";
      const bg = bgVideoRef.current;
      const logo = logoVideoRef.current;
      if (hidden) {
        bg?.pause();
        logo?.pause();
      } else {
        void bg?.play().catch(() => {});
        void logo?.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      {...props}
      className={[
        "relative h-screen w-full overflow-hidden",
        "bg-[#080503]",
        className ?? ""
      ].join(" ")}
    >
      {/* Video background */}
      <video
        ref={bgVideoRef}
        className="absolute inset-0 h-full w-full object-cover object-[50%_0%] grayscale saturate-0"
        src="/videos/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Subtle dark overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center">
        {/* Center animation */}
        <video
          ref={logoVideoRef}
          className="h-auto w-[260px] max-w-[70vw] mix-blend-screen brightness-[1.08] contrast-[1.12]"
          src="/identity/animacion-logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />

        <div className="mt-6 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <BtnCallao
            type="button"
            className="w-full sm:w-auto"
            onClick={onReserve}
          >
            {ctaLabels[0]}
          </BtnCallao>
          <BtnCallao type="button" className="w-full sm:w-auto">
            {ctaLabels[1]}
          </BtnCallao>
          <BtnCallao type="button" className="w-full sm:w-auto">
            {ctaLabels[2]}
          </BtnCallao>
        </div>
      </div>
    </section>
  );
}

