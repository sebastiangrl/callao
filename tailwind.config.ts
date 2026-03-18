import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        crimson: "#FE0000",
        ruby: "#BA0005",
        gris: "#A7A3A2",
        negro: "#080503"
      }
    }
  }
} satisfies Config;

