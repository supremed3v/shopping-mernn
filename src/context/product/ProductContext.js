import axios from "axios";
import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./ProductReducer";
import { db } from "../../../config/firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const initialState = {
  products: null,
};
export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: "GET_PRODUCTS", payload: list });
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsub();
  }, []);

  return (
    <AppContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
