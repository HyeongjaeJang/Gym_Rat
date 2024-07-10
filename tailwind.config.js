/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        0: "0rem",
        1: "0.25rem",
        2: "0.5rem",
      },
      colors: {
        "primary-light": "#f7f8f8",
        "primary-dark": "#1a202c",
        "primary-blue": "#95AFFE",
        "primary-pupple": "#7C6DDB",
        "secondary-blue": "#dbeafe",
      },
    },
  },
  plugins: [
    {
      "postcss-import": {},
      "tailwindcss/nesting": "postcss-nesting",
      tailwindcss: {},
      autoprefixer: {},
    },
    require("daisyui"),
  ],
};
