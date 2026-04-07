"use client";

import { useEffect, useRef, useState } from "react";

type LazyCoverVideoProps = {
  src: string;
  className: string;
  poster?: string;
};

/**
 * No descarga el MP4 hasta que el bloque entra en viewport (IntersectionObserver).
 * Pausa al salir para ahorrar CPU/decodificación cuando el carril de eventos mueve el foco.
 */
export default function LazyCoverVideo({
  src,
  className,
  poster
}: LazyCoverVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const isOn = Boolean(entry?.isIntersecting);
        setVisible(isOn);
        if (isOn) setShouldMount(true);
      },
      { root: null, rootMargin: "100px", threshold: 0.06 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldMount) return;
    if (visible) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, shouldMount]);

  const mediaClass = ["absolute inset-0 h-full w-full", className].join(" ");

  return (
    <div ref={rootRef} className="relative h-full w-full min-h-[80px] overflow-hidden">
      {shouldMount ? (
        <video
          ref={videoRef}
          src={src}
          className={mediaClass}
          muted
          playsInline
          loop
          preload="metadata"
          {...(poster ? { poster } : {})}
          aria-hidden
        />
      ) : poster ? (
        <img src={poster} alt="" className={mediaClass} decoding="async" />
      ) : (
        <div className={`${mediaClass} bg-[#0a0604]`} aria-hidden />
      )}
    </div>
  );
}
