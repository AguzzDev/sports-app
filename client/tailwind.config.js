/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        21: "repeat(21, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        21: "repeat(21, minmax(0, 1fr))",
      },
      gridRowStart:{
        '6':'6',
        '7':'7',
        '8':'8',
        '9':'9',
        '10':'10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14':'14',
        '15':'15',
        '16':'16',
        '17':'17',
        '18':'18',
        '19':'19',
        '20':'20',
        '21':'21',
      },
      colors: {
        black1: "#181F21",
        black2: "#23292C",
        gray1: "#A1A4A8",
        gray2: "#272D2F",
        gray3: "#2b3538",
      },
      fontFamily: {
        font: ["Font", "ui-sans-serif"],
      },
    },
  },
  plugins: [],
}
