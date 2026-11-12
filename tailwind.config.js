const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "src/**/*.{js,ts,jsx,tsx,mdx}"),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#173F7A",
        primary: "#24549A",
        soft: "#EDF3FD",
        bg: "#F8F9FC",
        ink: "#263445",
        text: "#263445",
        muted: "#8994A5",
        line: "#E7EBF1",
        border: "#E7EBF1",
        success: "#26966B",
        warning: "#D99427",
        danger: "#D94B62",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(23,63,122,0.06), 0 4px 14px rgba(23,63,122,0.04)",
      },
    },
  },
  plugins: [],
};
