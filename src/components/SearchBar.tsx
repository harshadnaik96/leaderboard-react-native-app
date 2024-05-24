import React from "react";
import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
};
export const SearchBar = (props: Props): React.JSX.Element => {
  const { value, onChange, onCancel } = props;

  return (
    <View className='flex flex-row items-center justify-between w-full p-2 border rounded-md outline-none h-fit decoration-none border-content'>
      <View className='flex flex-row items-center'>
        <View>
          <Ionicons name='search' className='p-2 text-input' size={20} />
        </View>
        <View>
          <TextInput
            value={value ?? ""}
            onChangeText={(value) => onChange(value)}
            placeholder='Search users...'
            className='p-2 text-content'
            placeholderTextColor='text-content'
          />
        </View>
      </View>
      <View>
        <Ionicons
          name='close'
          className='p-2 text-input'
          size={24}
          onPress={onCancel}
        />
      </View>
    </View>
  );
};
