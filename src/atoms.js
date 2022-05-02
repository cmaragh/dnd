import { atom } from "recoil";

export const searchOptionState = atom({
  key: "searchOptionState",
  default: "",
});

export const spellListState = atom({
  key: "spellListState",
  default: [],
});

export const searchStringState = atom({
  key: "searchStringState",
  default: "",
});

export const searchResultState = atom({
  key: "searchResultState",
  default: null,
});

export const damageComparisonDataState = atom({
  key: "damageComparisonDataState",
  default: [],
});
