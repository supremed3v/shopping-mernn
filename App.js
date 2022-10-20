import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "./src/screens/GettingStarted";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import MainScreen from "./src/screens/MainScreen";
import Favorites from "./src/screens/Favorites";
import Cart from "./src/screens/Cart";
import Profile from "./src/screens/Profile";
import Shop from "./src/screens/Shop";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const HomeStack = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Signup"
  >
    <AuthStack.Screen name="GettingStarted" component={GettingStarted} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const Home = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo
            name="home"
            size={24}
            color={`${focused ? "#EF3651" : "#979797"}`}
          />
        ),
      }}
      component={MainScreen}
    />
    <HomeStack.Screen
      name="Shop"
      options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="shoppingcart"
            size={24}
            color={`${focused ? "#EF3651" : "#979797"}`}
          />
        ),
      }}
      component={Shop}
    />
    <HomeStack.Screen
      name="Cart"
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo
            name="shopping-bag"
            size={24}
            color={`${focused ? "#EF3651" : "#979797"}`}
          />
        ),
      }}
      component={Cart}
    />
    <HomeStack.Screen
      name="Favorites"
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name="favorite-border"
            size={24}
            color={`${focused ? "#EF3651" : "#979797"}`}
          />
        ),
      }}
      component={Favorites}
    />
    <HomeStack.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="user-circle"
            size={24}
            color={`${focused ? "#EF3651" : "#979797"}`}
          />
        ),
      }}
      component={Profile}
    />
  </HomeStack.Navigator>
);

export default function App() {
  const Theme = {
    dark: true,
    colors: {
      background: "rgb(31, 31, 41)",
      primary: "#EF3651",
      text: "#F5F5F5",
      darkColor: "#2A2C36",
      textColorLight: "#b3b3b3",
      errorColor: "#FF2424",
      successColor: "#55D85A",
      whiteColor: "#F6F6F6",
      textGray: "#ABB4BD",
    },
  };

  return (
    <NavigationContainer theme={Theme}>
      <MainStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeScreen"
      >
        <MainStack.Screen name="Auth" component={AuthStackScreen} />
        <MainStack.Screen name="HomeScreen" component={Home} />
      </MainStack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
