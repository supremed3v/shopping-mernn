import { View, Text, Pressable, Image } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Rating from "react-native-easy-rating";
import { MaterialIcons } from "@expo/vector-icons";
import { useProductContext } from "../context/product/ProductContext";

export default function ProductCard({ item }) {
  const [rating, setRating] = useState(4);
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();
  const onFavorites = () => {
    setFocused(!focused);
  };
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("ProductDetails", { item: item })}
      >
        <Image
          source={{
            uri: item.images[3],
          }}
          style={{ width: 148, height: 184, borderRadius: 10 }}
          resizeMode="contain"
        />
        <Rating
          rating={rating}
          max={5}
          iconWidth={20}
          iconHeight={20}
          onRate={setRating}
        />
        <Text style={{ color: colors.textGray, fontWeight: "300" }}>
          {!item.description ? "No description" : item.description.slice(0, 20)}
        </Text>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: "600" }}>
          {item.title.length > 10 ? item.title.slice(0, 10) : item.title}
        </Text>
        <Text
          style={{ color: colors.textGray, fontSize: 18, fontWeight: "400" }}
        >
          {item.price} /= PKR
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
