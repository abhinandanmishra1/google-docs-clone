/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#3b82f6",
        },
        gray: {
          lightest: "#DADCE0",
          lighter: "#F1F3F4",
          light: "#5F6368",
          200: "#bdc1c6",
          dark: "#414549",
          darker: "#80868b",
        },
      },
      boxShadow: {
        custom: "0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)",
      },
    },
  },
  plugins: [],
};
