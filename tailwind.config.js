/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // text
        DarkGray: "#444",
        offWhite: "#f3f3f3",
        blurBg: "rgba(255, 255, 255, 0.4)",
        // deposit
        greenDone: "#66c873",

        // .operation--loan
        light_green: "#39b385",
        lemon: "#9be15d",

        // .operation--close
        light_pink: "#e52a5a",
        light_red: "#ff585f",

        // .operation--transfer
        gold: "#ffb003",
        light_Yellow: "#ffcb03",

        // deposit
        dark_Green: "#39b385",
        light_lemon: "#9be15d",

        // WITHDRAWAL
        warn: "#f5465d",
      },
    },
  },
  plugins: [],
};
