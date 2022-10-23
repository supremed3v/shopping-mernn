import { View, Text } from "react-native";
import React, { useEffect } from "react";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  console.log(item);

  return (
    <View>
      <Text style={{ color: "white" }}>{item.category}</Text>
    </View>
  );
}
