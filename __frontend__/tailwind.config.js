/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGlassMorphism: "rgba(67, 67, 5, 0.28)",
        borderColor: "#FEFE007D",
        borderScale: {
          1: "rgba(254, 254, 0, 0.49)",
          2: "rgba(255, 61, 0, 0.31)",
        },
      },
      backgroundImage: {
        btnGradientColor:
          "linear-gradient(to right bottom, #FEFE00, #FF3D00) 86% 46%",
      },
    },
  },
  plugins: [],
};
