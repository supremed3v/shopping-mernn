import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import BackButton from "../components/BackButton.js";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button.js";
import { InputOutline } from "react-native-input-outline";
import { signUp } from "../../helpers/AuthApi.js";
import { useContext } from "react";
import firebase, { db, auth, storage } from "../../config/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Signup({ navigation }) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      await updateProfile(res.user, {
        displayName: name,
      });
      try {
        const docRef = doc(db, "Users", res.user.uid);
        const data = {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: email,
          role: "user",
        };
        navigation.navigate("HomeScreen");
        setDoc(docRef, data).then((docRef) => {
          console.log("Document updated successfully");
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{ paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}
    >
      <BackButton />
      <Text
        style={{
          color: colors.text,
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        Signup
      </Text>
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Name"
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
          placeholder="Email"
          fontSize={14}
          style={{ marginTop: 15 }}
          autoCorrect={false}
          keyboardAppearance="dark"
          autoCapitalize="words"
          backgroundColor={colors.darkColor}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputOutline
          fontColor={colors.textGray}
          activeColor={colors.primary}
          placeholder="Password"
          fontSize={14}
          style={{ marginTop: 15 }}
          backgroundColor={colors.darkColor}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Pressable
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          alignSelf: "flex-end",
          flexDirection: "row",
          marginTop: 20,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: colors.whiteColor, marginRight: 10 }}>
          Already have an account?
        </Text>
        <FontAwesome name="long-arrow-right" size={20} color={colors.primary} />
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Button title={"SIGN UP"} func={() => signUp()} />
      </View>
    </View>
  );
}
