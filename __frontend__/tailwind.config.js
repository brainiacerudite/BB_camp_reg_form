/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGlassMorphism: "rgba(67, 67, 5, 0.28)",
        borderColor: "#FEFE007D",
      },
      backgroundImage: {
        btnGradientColor:
          "linear-gradient(to right bottom, rgba(254, 254, 0, 0.86), rgba(255, 61, 0, 0.46))",
      },
    },
  },
  plugins: [],
};
