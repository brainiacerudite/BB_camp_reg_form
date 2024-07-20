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
          "linear-gradient(to right bottom, #FEFE00, #FF3D00) 86% 46%",
      },
    },
  },
  plugins: [],
};
