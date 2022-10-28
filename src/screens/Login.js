import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
import { InputOutline } from "react-native-input-outline";
import firebase, { db, auth, storage } from "../../config/firebaseConfig";
import { AuthContext } from "../context/user/AuthContext.js";

function Login({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const { dispatch } = useContext(AuthContext);

  const onLogin = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      setLoader(true);
      await auth.signInWithEmailAndPassword(email, password).then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.user });
        navigation.navigate("HomeScreen");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{ paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}
    >
      <BackButton />
      {loader === true ? (
        <ActivityIndicator size={"large"} color={colors.primary} />
      ) : (
        <>
          <Text
            style={{
              color: colors.text,
              fontSize: 25,
              fontWeight: "bold",
              marginTop: 40,
            }}
          >
            Login
          </Text>
          <View
            style={{
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputOutline
              fontColor={colors.textGray}
              activeColor={colors.primary}
              placeholder="Email"
              fontSize={14}
              style={{ marginTop: 15 }}
              autoCorrect={false}
              keyboardAppearance="dark"
              autoCapitalize="words"
              backgroundColor={colors.darkColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <InputOutline
              fontColor={colors.textGray}
              activeColor={colors.primary}
              placeholder="Password"
              fontSize={14}
              style={{ marginTop: 15 }}
              backgroundColor={colors.darkColor}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Pressable
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              alignSelf: "flex-end",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ color: colors.whiteColor, marginRight: 10 }}>
              Forgot your password?
            </Text>
            <FontAwesome
              name="long-arrow-right"
              size={20}
              color={colors.primary}
            />
          </Pressable>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Button title={"LOGIN"} func={() => onLogin()} />
          </View>
        </>
      )}
    </View>
  );
}

export default Login;
