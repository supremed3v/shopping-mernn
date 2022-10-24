import React, { useEffect, useState, createContext } from "react";

import firebase, { db, auth, storage } from "../../../config/firebaseConfig";

export const AuthContext = createContext({
  user: null,
  loader: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user, setLoader(false));
      setLoader(false);
    });
    return unsubscribe;
  }, []);
  const fetchUserInfo = async () => {
    const userRef = firebase.firestore().collection("Users").doc(user?.uid);
    const doc = await userRef.get();
    const data = doc.data();
    setUserData(data);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loader, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
