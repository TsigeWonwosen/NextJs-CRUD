import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import sideMenuReducer from "./sideMenuSlice";
import mainMenuReducer from "./mainMenuSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    sideMenu: sideMenuReducer,
    mainMenu: mainMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
