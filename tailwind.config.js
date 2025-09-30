/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FCF6E8",
          100: "#F7EED8",
          200: "#EFE0BA",
        },
        ink: {
          900: "#111111",
          800: "#1A1A1A",
        },
        mint: {
          50: "#ECFDF5",
          200: "#A7F3D0",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        sun: {
          50: "#FFFBEB",
          200: "#FDE68A",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        coral: {
          50: "#FEF2F2",
          200: "#FECACA",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
        },
        royal: {
          50: "#F5F3FF",
          200: "#DDD6FE",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
        sky: {
          50: "#F0F9FF",
          200: "#BAE6FD",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
        },
      },
      borderRadius: { "3xl": "1.5rem" },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
