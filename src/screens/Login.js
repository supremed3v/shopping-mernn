import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
import InputOutline from "react-native-input-outline";
export default function Login() {
  const { colors } = useTheme();

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
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Password"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          secureTextEntry={true}
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
        <Button title={"LOGIN"} />
      </View>
    </View>
  );
}
