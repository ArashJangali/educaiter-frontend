/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        //added for example
        none: 0,
        square: [1, 1],
        "16/9": [16, 9],
        "4/3": [4, 3],
        "21/9": [21, 9],
      },
      colors: {
        "primary": "#003366",
        "secondary-light-blue": "#6699CC",
        "light-gray": "#E0E0E0",
        "medium-gray": "#A0A0A0",
        "dark-gray": "#333333",
        "white": "#FFFFFF",
        //added for example
        "brand-grey": {
          DEFAULT: "#787878",
          50: "#aaaaaa",
          100: "#a0a0a0",
          200: "#969696",
          300: "#8c8c8c",
          400: "#828282",
          500: "#787878",
          600: "#6e6e6e",
          700: "#646464",
          800: "#5a5a5a",
          900: "#505050",
        },
      },
      fontSize: {
        //added for example
        "font-lg": ["1rem", "1.375rem"],
        "font-base": ["0.875rem", "1.094rem"],
        "font-sm": ["0.766rem", "1.149rem"],
        "font-xs": ["0.714rem", "0.714rem"],
      },
      lineHeight: {},
      screens: {
        //added for example
        sm: { max: "768px" },
        lg: { min: "769px", max: "3000px" },
      },
      height: {},
      width: {},
      padding: {},
      margin: {},
    },
  },
  plugins: [],
};
