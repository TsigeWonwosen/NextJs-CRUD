import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Dark Mode Colors
        "dark-bg": "#020212fb", // Dark background
        "dark-text": "#D9D9D9", // Light text
        "dark-primary": "#3b82f6", // Blue accent
        "dark-secondary": "#9333ea", // Purple accent
        "dark-accent": "#f59e0b", // Orange accent
        "dark-button": "#593D88",

        // Light Mode Colors
        "light-bg": "#F2F4F7",
        "light-bgw": "#FFFFFF",
        "light-text": "#344767",
        "light-primary": "#3b82f6",
        "light-secondary": "#6c757d",
        "light-accent": "#f59e0b",
        "light-button": "#764ABC",
      },
    },
  },
  plugins: [],
};
export default config;
