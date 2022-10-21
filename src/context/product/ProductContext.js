import axios from "axios";
import React, { createContext, useReducer, useState, useEffect } from "react";
import { ProductReducer } from "./ProductReducer";

export const ProductContext = createContext({
  products: [],
  loading: true,
});

const ProductContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    await axios
      .get("http://192.168.18.8:4000/api/v1/products")
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, []);
  return (
    <ProductContext.Provider value={{ data, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
