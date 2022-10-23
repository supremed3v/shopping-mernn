import axios from "axios";
import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./AuthReducer";
import { auth, firebase, db } from "../../../config/firebaseConfig";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (email, password) => async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

  const signUp = (email, password) => async () => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SIGNUP_SUCCESS", payload: user });
      await updateProfile(user.user, { displayName: email });
      try {
        await setDoc(doc(db), "Users", user.user.uid),
          {
            uid: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
            role: "user",
          };
        await setDoc(doc(db), "reviews", user.user.uid, {});
      } catch (error) {
        dispatch({ type: "SIGNUP_FAIL", payload: error.response.data.message });
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error.response.data.message });
    }
  };

  const userInfo = async () => {
    dispatch({ type: "USER_INFO_REQUEST" });
    try {
      const userRef = firebase.firestore().collection("Users").doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        dispatch({ type: "USER_INFO_SUCCESS", payload: doc.data() });
      }
    } catch (error) {
      dispatch({
        type: "USER_INFO_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        dispatch({ type: "SIGNUP_SUCCESS", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });
    return unsubscribe;
  });

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };
