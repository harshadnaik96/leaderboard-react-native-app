export type TData = {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  rank?: number;
};

export type TAction =
  | "SEARCH_AND_FIND"
  | "SORT_DESC"
  | "SORT_ASC"
  | "RESET_SEARCH"
  | "LOWEST_RANK";

export type TStore = {
  rankState: Array<{
    bananas: number;
    lastDayPlayed: string;
    longestStreak: number;
    name: string;
    stars: number;
    subscribed: boolean;
    uid: string;
  }>;
};

export type TSearchType = "BASIC" | "FUZZY";
