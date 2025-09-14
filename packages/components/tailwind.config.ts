import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../../apps/beehive/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
