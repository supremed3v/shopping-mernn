import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
import { InputOutline } from "react-native-input-outline";

function Login() {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onLogin = async () => {
    console.log("Login");
  };

  return (
    <View
      style={{ paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}
    >
      <BackButton />
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
        <FontAwesome name="long-arrow-right" size={20} color={colors.primary} />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Button title={"LOGIN"} onPress={onLogin} />
      </View>
    </View>
  );
}

export default Login;
