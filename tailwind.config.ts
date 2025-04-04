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
      borderWidth: {
        "1": "0.5px",
        "3": "3px",
        "5": "5px",
        "10": "10px",
        "20": "20px", // Custom border width
      },
      fontFamily: {
        system: [
          "apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          '"Fira Sans"',
          "Ubuntu",
          "Oxygen",
          '"Oxygen Sans"',
          "Cantarell",
          '"Droid Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Lucida Grande"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Dark Mode Colors
        "dark-bg": "#020212fb", // Dark background
        "dark-bg-b": "#080822fb",
        "dark-text": "#D9D9D9", // Light text
        "dark-text-d": "#06061ffe",
        "dark-primary": "#3b82f6", // Blue accent
        "dark-secondary": "#9333ea", // Purple accent
        "dark-accent": "#f59e0b", // Orange accent
        "dark-button": "#567AED",
        "dark-contrest": "#010A1F",

        // Light Mode Colors
        "light-bg": "#F3F4F3",
        "light-bgw": "#FFFFFF",
        "light-text": "#27272A",
        "light-text-d": "#d4d4d8",
        "light-primary": "#3b82f6",
        "light-secondary": "#6c757d",
        "light-accent": "#f59e0b",
        "light-button": "#567AED",
        "light-contrest": "#e5e5e5",
      },
    },
  },
  plugins: [],
};
export default config;
