import { View } from "react-native";
import { SubApp } from "./src/SubApp";
import { configureStore } from "./src/store";
import { Provider } from "react-redux";

const store = configureStore();

export default function App() {
  return (
    <View className='w-full h-full p-6 '>
      <Provider store={store}>
        <SubApp />
      </Provider>
    </View>
  );
}
