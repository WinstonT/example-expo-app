import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../types/Product";
import Constants from "../constants/Constants";
import ExploreProductItem from "./ExploreProductItem";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  list: {
    padding: 12,
  },
});

export default function ExploreProductsList() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = () => {
    axios.get(`${Constants.baseUrl}/products`).then((res) => setData(res.data));
  };

  const renderItem: ListRenderItem<Product> = ({ item: product, index }) => (
    <ExploreProductItem product={product} index={index} key={product.id} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.list}
      endFillColor={Colors.primary}
    />
  );
}
