export default config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0f0f0f",
          700: "#1f1f1f",
          100: "#f6f6f6",
        },
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
