import { describe, it, expect } from 'vitest';
import reducer, { actionSetCardInfoVisible } from './cardInfo';

describe('cardInfo reducer', () => {
  it('ouvre la modale InoBank', () => {
    const initialState = {
      InoBank: false,
      DTK: false,
      Casalink: false,
      Spiecraft: false,
      GithubSearcher: false,
      Todolist: false,
      ResidenceAlexandre: false
    };

    const newState = reducer(initialState, actionSetCardInfoVisible({ projet: 'InoBank' }));

    expect(newState.InoBank).toBe(true);
  });
});
