module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "crude-blue" : "#3771c8",
        "crude-darkBlue" : "#282c34",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}