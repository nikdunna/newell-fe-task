/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "newell-blue": "#298FC2",
        "newell-gray": "#696158",
      },
    },
  },
  plugins: [],
};
