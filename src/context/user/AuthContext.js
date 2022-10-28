import React, { useEffect, useState, createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase, { db, auth, storage } from "../../../config/firebaseConfig";
import AuthReducer from "./AuthReducer";

const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  currentUser: null ? getUser() : null,
  loader: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      let setUser = async () => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      };
      user && setUser();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
