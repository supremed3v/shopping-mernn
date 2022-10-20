import { View, Text, Pressable } from "react-native";
import React from "react";

export default function SmallButton({ title, onPress }) {
  return (
    <Pressable
      onPress={() => console.log("press") || onPress()}
      style={{
        backgroundColor: "#EF3651",
        height: 40,
        width: 150,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#f5f5f5", fontSize: 14 }}>{title}</Text>
    </Pressable>
  );
}
