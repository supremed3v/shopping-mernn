import { View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton() {
  return (
    <View style={{ marginTop: 50 }}>
      <Pressable onPress={() => console.log("tapped")}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </Pressable>
    </View>
  );
}
