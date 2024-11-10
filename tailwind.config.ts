import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: "var(--brown)",
        leaf: "var(--leaf)",
        wind: "var(--wind)",
        solar: "var(--solar)",
        pine: "var(--pine)",
        seedling: "var(--seedling)",
        ash: "var(--ash)",

      },
      fontFamily: {
        sans: "var(--font-sans)",
        main: "var(--font-main)",
      },
    },
  },
  plugins: [],
} satisfies Config;
