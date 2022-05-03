import { NavigationContainer } from "@react-navigation/native";
import Search from "./components/Search";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import UselessTextInput from "./components/test";
import { Provider } from "react-redux";
import { store } from "./store/inputStore";
import "react-native-gesture-handler";

const Stack = createSharedElementStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="search"
          screenOptions={{ headerMode: "none" }}
        >
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="test" component={UselessTextInput} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
