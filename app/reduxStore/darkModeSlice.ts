import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
}

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isDarkMode") === "true";
  }
  return false; // Default value for server-side rendering
};

const initialState: ThemeState = {
  isDarkMode: getInitialDarkMode(),
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("isDarkMode", state.isDarkMode.toString());
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
