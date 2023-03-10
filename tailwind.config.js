/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        darkPurple: "#643173",
        purple: "#7D5BA6",
        pastelBlue: "#86A59C",
        seaFoam: "#89CE94",
        jet: "#333333",
      },
      fontFamily: {
        sans: ["Proxima Nova", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    themes: [
      {
        custom: {
          primary: "#7D5BA6",
          secondary: "#643173",
          accent: "#89CE94",
          neutral: "#86A59C",
          "base-100": "#ffffff",
        },
      },
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
