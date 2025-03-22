import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: false,
};

const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
    closeSideMenu: (state) => {
      state.isSideMenuOpen = false;
    },
  },
});

export const { toggleSideMenu, closeSideMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
