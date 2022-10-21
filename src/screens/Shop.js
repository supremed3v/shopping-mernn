import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/product/ProductContext";

export default function Shop() {
  const { data, loading } = useContext(ProductContext);
  console.log(data);

  return (
    <View>
      <ProductCard />
    </View>
  );
}
