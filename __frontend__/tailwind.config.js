/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGlassMorphism: "rgba(67, 67, 5, 0.28)",
        inputBgColor: "rgba(0, 0, 0, 0.38)",
        placeholderColor: "rgba(157, 157, 133, 0.4)",
        borderColor: "#FEFE007D",
        borderScale: {
          1: "rgba(254, 254, 0, 0.49)",
          2: "rgba(255, 61, 0, 0.31)",
        },
      },
      backgroundImage: {
        defaultBgImage: "url(assets/images/hero-bg-image.png)",
        btnGradientColor:
          "linear-gradient(to right bottom, rgba(254, 254, 0, 0.86), rgba(255, 61, 0, 0.46))",
      },
    },
  },
  plugins: [],
};
