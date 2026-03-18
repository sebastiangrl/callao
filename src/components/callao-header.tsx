import type { HTMLAttributes } from "react";

export default function CallaoHeader(props: HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      className={[
        "fixed inset-x-0 top-0 z-50 bg-transparent",
        "flex items-center justify-center px-6 py-4",
        props.className ?? ""
      ].join(" ")}
    >
      <img
        src="/identity/callao-icon.svg"
        alt="Callao"
        className="h-10 w-auto"
      />
    </header>
  );
}

