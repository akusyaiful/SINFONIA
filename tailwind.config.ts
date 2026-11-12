import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#173F7A", primary: "#24549A", soft: "#EAF1FC", bg: "#F8F9FC",
        ink: "#202938", muted: "#7B8494", line: "#E9EDF3",
        success: "#15966B", warning: "#E7A23B", danger: "#D94B65",
      },
      fontFamily: { sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"] },
      boxShadow: { card: "0 1px 3px rgba(23,63,122,0.06), 0 4px 14px rgba(23,63,122,0.04)" },
    },
  },
  plugins: [],
};
export default config;
