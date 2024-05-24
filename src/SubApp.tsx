import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Vibration,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchBar } from "./components";
import { useSelector } from "react-redux";
import { TData, TSearchType, TStore } from "./types/common.type";
import { useRankAction } from "./actions";
import classNames from "classnames";
import { Render } from "./utils";

export const SubApp = (): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<"ASC" | "DESC">("ASC");
  const [searchType, setSearchType] = useState<TSearchType>("BASIC");

  const {
    handleSearchAndFind,
    handleResetSearch,
    handleSortAscending,
    handleSortDescending,
    handleFilterByLowestRank,
  } = useRankAction();

  const state = useSelector((state: TStore) => state.rankState);

  const _renderItem = useCallback(
    (item: TData) => {
      const shouldHighlight =
        searchValue.length > 0 && item?.name.includes(searchValue);
      return (
        <View key={item.uid} className='flex flex-row justify-between'>
          <Text
            className={classNames(
              "w-24 py-2 mx-5 my-2 font-medium text-left break-words text-content",
              {
                "bg-yellow-400 font-medium": shouldHighlight,
              }
            )}
          >
            <Render if={!!item?.name}>
              <Text>{item?.name}</Text>
            </Render>

            <Render if={!item?.name}>
              <Text>-</Text>
            </Render>
          </Text>
          <Text className='w-24 py-2 mx-5 my-2 font-medium text-left break-words text-content'>
            {item?.rank}
          </Text>
          <Text className='w-24 py-2 mx-5 my-2 font-medium text-left break-words text-content'>
            {item?.bananas}
          </Text>
        </View>
      );
    },
    [searchType]
  );

  const handleSearchTypeTabs = (searchType: TSearchType) => {
    Vibration.vibrate(50);
    setSearchType(searchType);
    handleResetSearch();
  };

  return (
    <SafeAreaView>
      <View className='flex flex-row justify-center gap-4 p-2'>
        <View className=''>
          <Pressable
            onPress={() => handleSearchTypeTabs("BASIC")}
            className={classNames("px-4 rounded-md py-2  shadow-sm ", {
              "bg-gray-200 text-content": searchType !== "BASIC",
              "bg-white text-content border border-content shadow-sm":
                searchType === "BASIC",
            })}
          >
            <View className='flex flex-row items-center gap-2'>
              <Text className='text-sm font-semibold text-content'>
                Basic Search
              </Text>
            </View>
          </Pressable>
        </View>

        <View className=''>
          <Pressable
            onPress={() => handleSearchTypeTabs("FUZZY")}
            className={classNames(
              "px-4 rounded-md py-2 bg-gray-200  shadow-sm ",
              {
                "bg-gray-200 text-content": searchType !== "FUZZY",
                "bg-white text-content border border-content shadow-sm":
                  searchType === "FUZZY",
              }
            )}
          >
            <View className='flex flex-row items-center gap-2'>
              <Text className='text-sm font-semibold text-content'>
                Fuzzy Search
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View className='flex flex-row items-center w-full gap-2 mt-2'>
        <View className='w-4/5'>
          <SearchBar
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            onCancel={() => {
              setSearchValue("");
              handleResetSearch();
            }}
          />
        </View>
        <View className='text-center '>
          <TouchableOpacity
            className='p-3 border rounded-md'
            onPress={() => handleSearchAndFind(searchValue, searchType)}
            disabled={!searchValue}
          >
            <Ionicons name='search' className='w-fit' size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View className='mt-4 border-b border-disable'></View>

      <View className='w-full '>
        <View className='flex flex-row items-center gap-4 mt-1'>
          <View className=''>
            <Pressable
              onPress={() => {
                Vibration.vibrate(50);
                if (sortBy === "ASC") {
                  handleSortAscending();
                  setSortBy("DESC");
                } else {
                  handleSortDescending();
                  setSortBy("ASC");
                }
              }}
              className='p-2 bg-white rounded-full shadow-sm '
            >
              <View className='flex flex-row items-center gap-2'>
                <Ionicons name='swap-vertical-outline' size={18} />
                <Text className='text-sm font-semibold text-content'>
                  Sort by Name
                </Text>
              </View>
            </Pressable>
          </View>

          <View className=''>
            <Pressable
              onPress={() => {
                Vibration.vibrate(50);
                handleFilterByLowestRank();
              }}
              className='px-4 py-2 bg-white rounded-full shadow-sm '
            >
              <View className='flex flex-row items-center gap-2'>
                <Ionicons name='arrow-down-circle-outline' size={18} />
                <Text className='text-sm font-semibold text-content'>
                  Lowest Rank
                </Text>
              </View>
            </Pressable>
          </View>

          <View className=''>
            <Pressable
              onPress={() => {
                Vibration.vibrate(50);
                setSearchValue("");
                handleResetSearch();
              }}
              className='px-4 py-2 bg-white rounded-full shadow-sm '
            >
              <Text className='text-sm font-semibold text-content'>Reset</Text>
            </Pressable>
          </View>
        </View>
        <View className='flex flex-row justify-center mt-4'>
          <Text className='text-2xl font-bold text-black'>Search Results</Text>
        </View>

        <View className='h-[60vh] border-b'>
          <View className='flex flex-row justify-between border-b border-content '>
            <Text className='w-24 p-2 mx-3 my-1 text-sm font-semibold break-words whitespace-pre-wrap text-content'>
              Name
            </Text>
            <Text className='w-24 p-2 mx-3 my-1 text-sm font-semibold break-words whitespace-pre-wrap text-content'>
              Rank
            </Text>
            <Text className='w-24 p-2 mx-3 my-1 text-sm font-semibold break-words whitespace-pre-wrap text-content'>
              No Of Bananas
            </Text>
          </View>

          <Render if={state.length === 0}>
            <View>
              <Text className='mt-4 text-lg font-medium text-center text-content'>
                This user name does not exist!
              </Text>
              <Text className='text-lg font-medium text-center text-content'>
                Please specify an existing user name!
              </Text>
            </View>
          </Render>

          <Render if={state.length > 0}>
            <FlatList
              data={state}
              keyExtractor={(item) => item.uid}
              renderItem={({ item }) => _renderItem(item)}
            />
          </Render>
        </View>
      </View>
    </SafeAreaView>
  );
};
