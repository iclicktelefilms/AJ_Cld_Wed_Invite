import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        lora: ["var(--font-lora)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fefdf0",
          100: "#fdf9cc",
          200: "#fbf099",
          300: "#f7e361",
          400: "#f3d032",
          500: "#D4AF37",
          600: "#b8920c",
          700: "#946e0d",
          800: "#7a5712",
          900: "#684714",
          950: "#3c2606",
        },
        burgundy: {
          50: "#fff1f2",
          100: "#ffe0e3",
          200: "#ffc5cb",
          300: "#fe9aa4",
          400: "#fb6070",
          500: "#f22d3f",
          600: "#d91224",
          700: "#b60e1c",
          800: "#960f1b",
          900: "#7d131c",
          950: "#8B0000",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
