import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import axios from "axios";
import ExploreProductItem from "../../components/ExploreProductItem";
import Constants from "../../constants/Constants";
import Product from "../../types/Product";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchBarContainer: {
    flexDirection: "row",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  searchBar: {
    flex: 1,
    height: 40,
    padding: 8,
    color: Colors.grey,
  },
  list: {
    padding: 0,
  },
});

export default function ExploreScreen() {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = () => {
    axios
      .get(`${Constants.baseUrl}/products`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const filterProducts = (value: string) => {
    const products = data.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setQuery(value);
    setFilteredData(products);
  };

  const renderItem: ListRenderItem<Product> = ({ item: product }) => (
    <ExploreProductItem product={product} key={product.id} />
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.searchBarContainer}>
        <Feather name="search" color={Colors.grey} size={12} />
        <TextInput
          value={query}
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={Colors.grey}
          cursorColor={Colors.grey}
          onChangeText={(value) => filterProducts(value)}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        style={styles.list}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
}
