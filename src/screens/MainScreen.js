import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import {
  AppContext,
  useProductContext,
} from "../context/product/ProductContext";
import { AuthContext } from "../context/user/AuthContext";

export default function MainScreen() {
  const { products } = useContext(AppContext);
  const { colors } = useTheme();
  const [laptops, setLaptops] = useState([]);
  const [phones, setPhones] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (products !== 0 && products !== null) {
      setLaptops(products.filter((item) => item.category === "Laptop"));
      setPhones(products.filter((item) => item.category === "SmartPhones"));
    }
  }, []);
  console.log(laptops);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ flex: 1, width: "100%", width: "100%" }}>
        <ScrollView style={{ flex: 1 }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            style={{
              width: "100%",
              height: 300,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              color: colors.text,
              fontSize: 40,
              width: "100%",
              fontWeight: "bold",
              letterSpacing: 2,
              // paddingBottom: 20,
              top: "-10%",
              marginLeft: 20,
              // position: "absolute",
            }}
          >
            Featured Items
          </Text>
          <View style={{ paddingTop: 5, paddingHorizontal: 10 }}>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                T-Shirts
              </Text>
              <Text style={{ color: colors.textGray }}>
                Best you could get!
              </Text>
              <FlatList
                horizontal={true}
                data={laptops}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Hoodies
              </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Mobile Accessories
              </Text>
              <FlatList
                horizontal={true}
                data={phones}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Computer Accessories
              </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Laptops
              </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Headphones
              </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                Speakers
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
