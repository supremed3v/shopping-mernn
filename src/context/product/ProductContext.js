import axios from "axios";
import React, { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./ProductReducer";

const AppContext = createContext();

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: false,
};

const API = "http://192.168.18.8:4000/api/v1/products";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data.products;
      dispatch({ type: "PRODUCTS_REQUEST", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  const productDetails = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const product = await res.data.products;
      dispatch({ type: "PRODUCT_DETAILS", payload: product });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    fetchProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, productDetails }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
