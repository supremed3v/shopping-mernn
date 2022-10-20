import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import SmallButton from "../components/SmallButton";

export default function MainScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ height: 250 }}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          style={{
            width: "100%",
            height: "100%",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 20,
            shadowColor: "black",
          }}
          resizeMode="cover"
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 40,
              width: "100%",
              fontWeight: "bold",
              letterSpacing: 0.5,
              paddingBottom: 20,
              top: 150,
            }}
          >
            Featured Items
          </Text>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, width: "100%", width: "100%" }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingTop: 40, paddingHorizontal: 10 }}>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{ color: colors.text, fontSize: 30, fontWeight: "700" }}
              >
                T-Shirts
              </Text>
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
