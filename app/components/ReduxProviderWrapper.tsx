"use client";
import { Provider } from "react-redux";
import { store } from "../reduxStore/store";

function ReduxProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}

export default ReduxProviderWrapper;
