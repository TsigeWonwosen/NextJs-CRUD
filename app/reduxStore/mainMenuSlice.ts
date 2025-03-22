import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMainMenuOpen: false,
};

const mainMenuSlice = createSlice({
  name: "mainMenu",
  initialState,
  reducers: {
    toggleMainMenu: (state) => {
      state.isMainMenuOpen = !state.isMainMenuOpen;
    },
    closeMainMenu: (state) => {
      state.isMainMenuOpen = false;
    },
  },
});

export const { toggleMainMenu, closeMainMenu } = mainMenuSlice.actions;
export default mainMenuSlice.reducer;
