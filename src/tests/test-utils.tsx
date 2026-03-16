import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import cardInfoReducer from "../store/reducer/cardInfo";

export function renderWithProviders(ui: ReactNode) {
  const store = configureStore({
    reducer: {
      cardInfo: cardInfoReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}
