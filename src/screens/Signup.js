import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
import { InputOutline } from "react-native-input-outline";

export default function Signup() {
  const { colors } = useTheme();
  const [value, setValue] = React.useState("");

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
        Signup
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
          placeholder="Name"
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
          Already have an account?
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
        <Button title={"SIGN UP"} />
      </View>
    </View>
  );
}
