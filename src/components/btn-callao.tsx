import type { ButtonHTMLAttributes } from "react";

type BtnCallaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline";
};

export default function BtnCallao({ className, variant, ...props }: BtnCallaoProps) {
  const base =
    "inline-flex items-center justify-center border border-white bg-transparent px-6 py-3 text-sm font-medium text-white " +
    "rounded-none transition-colors duration-200 hover:bg-white hover:text-[#080503]";

  return (
    <button
      {...props}
      className={[base, variant === "outline" ? "" : "", className].filter(Boolean).join(" ")}
    />
  );
}

