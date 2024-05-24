import { rankReducer } from "../reducers";
import { TData, TSearchType, TAction } from "../types";
import { expect, test } from "vitest";

type T = { type: TAction; payload: string; searchType: TSearchType };

const mockData: TData[] = [
  {
    bananas: 200,
    lastDayPlayed: "2018-11-22",
    longestStreak: 1,
    name: "Rica Ella Francisco",
    stars: 6,
    subscribed: false,
    uid: "00D1LA8puAa1GINkVpfgC1TmO0m1",
    rank: 1,
  },
  {
    bananas: 195,
    lastDayPlayed: "2017-11-01",
    longestStreak: 0,
    name: "Adh Fuoo",
    stars: 4,
    subscribed: false,
    uid: "x8RNvUgv5pZqDVatEXb2aYgSflq1",
    rank: 2,
  },

  {
    bananas: 150,
    lastDayPlayed: "2018-10-17",
    longestStreak: 1,
    name: "Rica Su YueHe",
    stars: 4,
    subscribed: false,
    uid: "ylL3XqPOlycHiPBuf1uXHlgZzEr2",
    rank: 3,
  },
  {
    bananas: 120,
    lastDayPlayed: "2017-11-01",
    longestStreak: 0,
    name: "Yo Yo Chou",
    stars: 4,
    subscribed: false,
    uid: "ylsPzJdfKggHuBVcqHVYxzVRdtJ2",
    rank: 4,
  },
  {
    bananas: 100,
    lastDayPlayed: "2017-11-01",
    longestStreak: 0,
    name: "Toke Chen",
    stars: 4,
    subscribed: false,
    uid: "ylwtBuIr70fEIxcCE80fSRRo7np2",
    rank: 5,
  },
];

test("should return empty array in SEARCH_AND_FIND with BASIC searchType when no match is found", () => {
  const action: T = {
    type: "SEARCH_AND_FIND",
    payload: "notfound",
    searchType: "BASIC",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([]);
});

test("should return search result in SEARCH_AND_FIND with BASIC searchType when match is found", () => {
  const action: T = {
    type: "SEARCH_AND_FIND",
    payload: "Rica",
    searchType: "BASIC",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([...mockData]);
});

test("should return empty array in SEARCH_AND_FIND with FUZZY searchType when no match is found", () => {
  const action: T = {
    type: "SEARCH_AND_FIND",
    payload: "notfound",
    searchType: "FUZZY",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([]);
});

test("should return search result in SEARCH_AND_FIND with FUZZY searchType when match is found", () => {
  const action: T = {
    type: "SEARCH_AND_FIND",
    payload: "rica",
    searchType: "FUZZY",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([
    {
      bananas: 200,
      lastDayPlayed: "2018-11-22",
      longestStreak: 1,
      name: "Rica Ella Francisco",
      stars: 6,
      subscribed: false,
      uid: "00D1LA8puAa1GINkVpfgC1TmO0m1",
      rank: 1,
    },
    {
      bananas: 150,
      lastDayPlayed: "2018-10-17",
      longestStreak: 1,
      name: "Rica Su YueHe",
      stars: 4,
      subscribed: false,
      uid: "ylL3XqPOlycHiPBuf1uXHlgZzEr2",
      rank: 3,
    },
  ]);
});

test("should sort names in list based on Ascending Order", () => {
  const action: T = {
    type: "SORT_ASC",
    payload: "",
    searchType: "BASIC",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([
    {
      bananas: 195,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Adh Fuoo",
      stars: 4,
      subscribed: false,
      uid: "x8RNvUgv5pZqDVatEXb2aYgSflq1",
      rank: 2,
    },
    {
      bananas: 200,
      lastDayPlayed: "2018-11-22",
      longestStreak: 1,
      name: "Rica Ella Francisco",
      stars: 6,
      subscribed: false,
      uid: "00D1LA8puAa1GINkVpfgC1TmO0m1",
      rank: 1,
    },
    {
      bananas: 150,
      lastDayPlayed: "2018-10-17",
      longestStreak: 1,
      name: "Rica Su YueHe",
      stars: 4,
      subscribed: false,
      uid: "ylL3XqPOlycHiPBuf1uXHlgZzEr2",
      rank: 3,
    },
    {
      bananas: 100,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Toke Chen",
      stars: 4,
      subscribed: false,
      uid: "ylwtBuIr70fEIxcCE80fSRRo7np2",
      rank: 5,
    },
    {
      bananas: 120,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Yo Yo Chou",
      stars: 4,
      subscribed: false,
      uid: "ylsPzJdfKggHuBVcqHVYxzVRdtJ2",
      rank: 4,
    },
  ]);
});

test("should sort names in list based on Descending Order", () => {
  const action: T = {
    type: "SORT_DESC",
    payload: "",
    searchType: "BASIC",
  };
  const newState = rankReducer(mockData, action);

  expect(newState).toEqual([
    {
      bananas: 120,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Yo Yo Chou",
      stars: 4,
      subscribed: false,
      uid: "ylsPzJdfKggHuBVcqHVYxzVRdtJ2",
      rank: 4,
    },
    {
      bananas: 100,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Toke Chen",
      stars: 4,
      subscribed: false,
      uid: "ylwtBuIr70fEIxcCE80fSRRo7np2",
      rank: 5,
    },
    {
      bananas: 150,
      lastDayPlayed: "2018-10-17",
      longestStreak: 1,
      name: "Rica Su YueHe",
      stars: 4,
      subscribed: false,
      uid: "ylL3XqPOlycHiPBuf1uXHlgZzEr2",
      rank: 3,
    },
    {
      bananas: 200,
      lastDayPlayed: "2018-11-22",
      longestStreak: 1,
      name: "Rica Ella Francisco",
      stars: 6,
      subscribed: false,
      uid: "00D1LA8puAa1GINkVpfgC1TmO0m1",
      rank: 1,
    },
    {
      bananas: 195,
      lastDayPlayed: "2017-11-01",
      longestStreak: 0,
      name: "Adh Fuoo",
      stars: 4,
      subscribed: false,
      uid: "x8RNvUgv5pZqDVatEXb2aYgSflq1",
      rank: 2,
    },
  ]);
});
