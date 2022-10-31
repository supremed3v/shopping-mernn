import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useCartContext } from "../context/cart/CartContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Button from "../components/Button";
import { AuthContext } from "../context/user/AuthContext";

export default function Cart() {
  const { cartItems, totalPrice, onRemove, totalQuantities } = useCartContext();
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const { colors } = useTheme();

  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <View style={{ marginTop: 40, flex: 1 }}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: colors.text, fontSize: 34 }}>My Cart</Text>
            {cartItems.length < 1 && (
              <View>
                <Text style={{ color: colors.text, fontSize: 18 }}>
                  Your cart is empty
                </Text>
                <Button
                  title={"Shop now!"}
                  func={() => navigation.navigate("HomeScreen")}
                />
              </View>
            )}
            {cartItems.map((item) => (
              <View
                style={{
                  marginVertical: 20,
                  backgroundColor: colors.darkColor,
                  borderRadius: 10,
                }}
                key={item.id}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.images[3] }}
                    style={{
                      width: 150,
                      height: 130,
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {item.title.length > 10
                        ? item.title.slice(0, 10)
                        : item.title}
                    </Text>

                    <View>
                      <Pressable
                        onPress={() => onRemove(item)}
                        style={{
                          position: "absolute",
                          top: -40,
                          right: 0,
                          width: 35,
                          height: 35,
                          backgroundColor: colors.darkColor,
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          elevation: 10,
                        }}
                      >
                        <AntDesign
                          name="delete"
                          size={24}
                          color={colors.primary}
                        />
                      </Pressable>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: 10,
                          marginTop: 50,
                        }}
                      >
                        <Text style={{ color: colors.textGray }}>
                          Quantity:
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 16,
                            fontWeight: "600",
                            paddingHorizontal: 5,
                          }}
                        >
                          {item.quantity}
                        </Text>

                        <Text
                          style={{
                            marginLeft: 20,
                            color: colors.text,
                            fontSize: 18,
                            fontWeight: "600",
                          }}
                        >
                          {item.price}/-
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {cartItems.length > 0 && (
        <>
          <View
            style={{
              flex: 1 / 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              // marginHorizontal: 20,
              position: "absolute",
              bottom: 0,
              backgroundColor: colors.darkColor,
              width: "100%",
              height: 100,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: colors.textGray, fontWeight: "600" }}>
              Total amount:
            </Text>
            <Text
              style={{ color: colors.text, fontSize: 20, fontWeight: "600" }}
            >
              {totalPrice}/-
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Button
              title={"Checkout"}
              func={() =>
                navigation.navigate("AddressDetails", {
                  total: totalPrice,
                  totalQuantities: totalQuantities,
                  items: cartItems,
                })
              }
            />
          </View>
        </>
      )}
    </>
  );
}
