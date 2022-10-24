import { View, Text, Pressable } from "react-native";
import React from "react";

export default function Button({ title, func }) {
  return (
    <Pressable
      onPress={func}
      style={{
        backgroundColor: "#EF3651",
        height: 50,
        width: 300,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#f5f5f5" }}>{title}</Text>
    </Pressable>
  );
}
