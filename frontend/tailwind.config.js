/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        humaine: {
          brand: "#4e71fe",
          "brand-hover": "#3d62e8",
          ink: "#111111",
          muted: "#676767",
          line: "#e4e9f4",
          subtle: "#f4f6fb",
          panel: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "Tahoma", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(17, 17, 17, 0.06)",
      },
    },
  },
  plugins: [],
};
