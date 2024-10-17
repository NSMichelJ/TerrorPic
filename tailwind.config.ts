import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "medium-purple": {
          "50": "#f9f6fe",
          "100": "#f2ebfc",
          "200": "#e6dafa",
          "300": "#d3bcf6",
          "400": "#b891ef",
          "500": "#9d67e5",
          "600": "#8647d6",
          "700": "#7235bb",
          "800": "#613099",
          "900": "#50287b",
          "950": "#34115a",
        },
      },
      backgroundImage: {
        gradient:
          "radial-gradient(at 72% 37%, #493c80 0px, transparent 50%), radial-gradient(at 11% 92%, #483c80 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
