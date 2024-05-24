import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { TSearchType } from "../types";

type TAction =
  | "SEARCH_AND_FIND"
  | "SORT_DESC"
  | "SORT_ASC"
  | "RESET_SEARCH"
  | "LOWEST_RANK";

type TReturnProps = {
  handleSearchAndFind: (value: string, searchType: TSearchType) => void;
  handleSortDescending: () => void;
  handleSortAscending: () => void;
  handleResetSearch: () => void;
  handleFilterByLowestRank: () => void;
};

export const useRankAction = (): TReturnProps => {
  const dispatch = useDispatch<
    Dispatch<{
      type: TAction;
      searchType?: TSearchType;
      payload?: string;
    }>
  >();

  const handleSearchAndFind = useCallback(
    (value: string, searchType: TSearchType) => {
      dispatch({
        type: "SEARCH_AND_FIND",
        searchType: searchType,
        payload: value,
      });
    },
    [dispatch]
  );

  const handleSortDescending = useCallback(() => {
    dispatch({ type: "SORT_DESC" });
  }, [dispatch]);

  const handleSortAscending = useCallback(() => {
    dispatch({ type: "SORT_ASC" });
  }, [dispatch]);

  const handleResetSearch = useCallback(() => {
    dispatch({ type: "RESET_SEARCH" });
  }, [dispatch]);

  const handleFilterByLowestRank = useCallback(() => {
    dispatch({ type: "LOWEST_RANK" });
  }, [dispatch]);

  return {
    handleSearchAndFind,
    handleSortDescending,
    handleSortAscending,
    handleResetSearch,
    handleFilterByLowestRank,
  };
};
