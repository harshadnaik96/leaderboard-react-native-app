import data from "../data/data.json";
import { TAction, TData, TSearchType } from "../types";
import { produce } from "immer";

const originalState: TData[] = Object.values(data);

const initialState: TData[] = originalState
  .sort((a, b) => b.bananas - a.bananas)
  .map((el, index) => ({
    ...el,
    rank: index + 1,
  }));

export const rankReducer = (
  state = initialState,
  action: { type: TAction; searchType: TSearchType; payload?: string }
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SEARCH_AND_FIND":
        if (!action.payload || action.payload.length === 0) {
          return;
        }

        if (action.searchType === "BASIC") {
          const foundIndex = draft.findIndex((el) =>
            el.name.includes(action.payload ?? "")
          );

          if (foundIndex === -1) {
            return [];
          }

          if (foundIndex !== -1 && foundIndex > 10) {
            const foundItem = draft[foundIndex];
            draft.splice(9, 0, foundItem);
          }

          while (draft.length > 10) {
            draft.pop();
          }
          break;
        } else if (action.searchType === "FUZZY") {
          let arr: TData[] = [];
          const checkIfkeywordMatches = new RegExp(`(${action.payload})`, "gi");

          for (let i = 0; i < draft.length; i++) {
            const label = draft[i].name.split(checkIfkeywordMatches);
            label.filter(Boolean).map((el) => {
              checkIfkeywordMatches.test(el) ? arr.push(draft[i]) : null;
            });
          }
          return arr;
        }

      case "SORT_ASC":
        draft.sort((a, b) => a.name.localeCompare(b.name));

        break;

      case "SORT_DESC":
        draft.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "LOWEST_RANK":
        draft.sort((a, b) => (b.rank ?? 0) - (a?.rank ?? 0));
        break;

      case "RESET_SEARCH":
        return originalState
          .sort((a, b) => b.bananas - a.bananas)
          .map((el, index) => ({
            ...el,
            rank: index + 1,
          }));

      default:
        break;
    }
  });
};
