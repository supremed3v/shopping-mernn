import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { Entypo } from "@expo/vector-icons";
import { useCartContext } from "../context/cart/CartContext";
import Carousel from "react-native-reanimated-carousel";
import Button from "../components/Button";

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  console.log(item);
  const { colors } = useTheme();
  const width = Dimensions.get("window").width;
  const { onAdd, qty } = useCartContext();

  const onAddToCart = () => {
    onAdd(item, qty);
    navigation.navigate("Cart");
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <BackButton />
          <Text style={{ color: colors.text, fontSize: 24 }}>{item.title}</Text>
          <Entypo name="share" size={24} color={colors.text} />
        </View>
        <View style={{ height: 400 }}>
          <Carousel
            data={item.images}
            autoPlay={true}
            width={width}
            height={400}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log(index)}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: width, height: 400 }}
                resizeMode="contain"
              />
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <Text
            style={{ color: colors.text, fontSize: 24, fontWeight: "bold" }}
          >
            {item.title}
          </Text>
          <Text
            style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
          >
            {(item.price * 1).toFixed(0)}/-
          </Text>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
          <Text style={{ color: colors.text }}>{item.description}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 30,
            }}
          >
            <Button title={"ADD TO CART"} func={onAddToCart} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
