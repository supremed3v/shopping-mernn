import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "./src/screens/GettingStarted";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const AuthStack = createNativeStackNavigator();

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
    },
  };

  return (
    <NavigationContainer theme={Theme}>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signup"
      >
        <AuthStack.Screen name="GettingStarted" component={GettingStarted} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Signup" component={Signup} />
      </AuthStack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
