module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "crude-blue" : "#3771c8",
        "crude-darkBlue" : "#004697",
        "crude-lightBlue" : "#719ffc",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}