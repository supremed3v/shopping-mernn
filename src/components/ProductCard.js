import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Rating from "react-native-easy-rating";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductCard() {
  const [rating, setRating] = useState(4);
  const [focused, setFocused] = useState(false);

  const onFavorites = () => {
    setFocused(!focused);
  };
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 40,
      }}
    >
      <Pressable>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
          }}
          style={{ width: 148, height: 184, borderRadius: 10 }}
        />
        <Rating
          rating={rating}
          max={5}
          iconWidth={20}
          iconHeight={20}
          onRate={setRating}
        />
        <Text style={{ color: colors.textGray, fontWeight: "300" }}>
          Product Desc
        </Text>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: "600" }}>
          Product Name
        </Text>
        <Text
          style={{ color: colors.textGray, fontSize: 18, fontWeight: "400" }}
        >
          600 /= PKR
        </Text>
      </Pressable>
      <Pressable
        onPress={onFavorites}
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          backgroundColor: colors.darkColor,
          position: "absolute",
          right: "58%",
          top: 190,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}
      >
        <MaterialIcons
          name="favorite-border"
          size={24}
          color={!focused ? colors.textGray : colors.primary}
        />
      </Pressable>
    </View>
  );
}
