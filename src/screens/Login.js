import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
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
        <TextInput
          style={{
            backgroundColor: colors.darkColor,
            width: "70%",
            color: colors.textColorWhite,
            paddingLeft: 20,
            height: 50,
            width: 300,
            borderRadius: 5,
          }}
          placeholder="Email"
          placeholderTextColor={colors.textColorLight}
        />
        <TextInput
          style={{
            backgroundColor: colors.darkColor,
            width: "70%",
            color: colors.textColorWhite,
            paddingLeft: 20,
            height: 50,
            width: 300,
            borderRadius: 5,
            marginTop: 20,
          }}
          placeholder="Password"
          placeholderTextColor={colors.textColorLight}
          passwordRules="required: lower; required: upper; required: digit; required: [-]; minlength: 8;"
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
