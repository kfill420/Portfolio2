import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CardInfoStateI {
  InoBank: boolean;
  DTK: boolean;
  Casalink: boolean;
  Spiecraft: boolean;
  GithubSearcher: boolean;
  Todolist: boolean;
  ResidenceAlexandre: boolean;
}

export const initialState: CardInfoStateI = {
  InoBank: false,
  DTK: false,
  Casalink: false,
  Spiecraft: false,
  GithubSearcher: false,
  Todolist: false,
  ResidenceAlexandre: false
};

export type ProjetKeys = keyof CardInfoStateI;

const cardInfoSlice = createSlice({
  name: 'cardInfo',
  initialState,
  reducers: {
    actionCardInfoVisible(state, action: PayloadAction<{ projet: ProjetKeys }>) {
      const { projet } = action.payload;
      state[projet] = !state[projet];
    },
  },
});

export const { actionCardInfoVisible } = cardInfoSlice.actions;
export default cardInfoSlice.reducer;
