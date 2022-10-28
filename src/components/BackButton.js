import { View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigate = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigate.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </Pressable>
    </View>
  );
}
