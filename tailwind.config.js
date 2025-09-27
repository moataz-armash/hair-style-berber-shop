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
      },
      borderRadius: { "3xl": "1.5rem" },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
