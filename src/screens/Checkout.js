import { View, Text, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { InputOutline } from "react-native-input-outline";
import Button from "../components/Button";
import { useStripe } from "@stripe/stripe-react-native";
import { AuthContext } from "../context/user/AuthContext";
import { db } from "../../config/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useCartContext } from "../context/cart/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function Checkout({ route }) {
  const { currentUser } = useContext(AuthContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const { total, items } = route.params;
  const { colors } = useTheme();

  const navigation = useNavigation();

  console.log("items", items);
  const { setCartItems } = useCartContext();

  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  console.log(clientSecret);

  const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      style: "alwaysDark",
      merchantDisplayName: "React Native Stripe",
    });
    console.log("success");
    if (error) {
      Alert.alert(error);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      saveOrder();
      Alert.alert("Success", "Your payment is confirmed!");
    }
  };

  const fetchPaymentIntent = async () => {
    const response = await fetch(
      "https://us-central1-shoppingapp-b5fb9.cloudfunctions.net/expressApi/payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      }
    );
    const data = await response.json();
    setClientSecret(data.clientSecret);
    return clientSecret;
  };

  const saveOrder = async () => {
    const docRef = doc(db, "Orders", currentUser.uid);
    const data = {
      name,
      address,
      city,
      state,
      zip,
      total,
      items,
      status: "pending",
    };
    await setDoc(docRef, data);
    setCartItems([]);

    navigation.navigate("HomeScreen");
  };

  const onCheckout = () => {
    if (name && address && city && state && zip) {
      // handle payments
      openPaymentSheet();
    } else {
      Alert.alert("Please fill out all fields");
    }
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 40,
          flexDirection: "row",
        }}
      >
        <BackButton />
        <Text
          style={{
            color: colors.text,
            fontSize: 26,
            fontWeight: "500",
            letterSpacing: 1,
            marginRight: "33%",
          }}
        >
          Checkout
        </Text>
      </View>
      <View>
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Full Name"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="dark"
          autoCapitalize="words"
          backgroundColor={colors.darkColor}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Address"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="City"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="State/Province/Region"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Zip/Postal Code"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          bottom: -200,
          flexDirection: "row",
        }}
      >
        <Text
          style={{ color: colors.textGray, fontSize: 15, fontWeight: "600" }}
        >
          Payable Amount:
        </Text>
        <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 15 }}>
          {total}/- PKR
        </Text>
      </View>
      <View
        style={{ bottom: -230, alignItems: "center", justifyContent: "center" }}
      >
        <Button title={"Pay Now"} func={() => onCheckout()} />
      </View>
    </View>
  );
}
