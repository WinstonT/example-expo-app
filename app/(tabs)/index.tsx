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
import { ScrollView } from "react-native-gesture-handler";
import Category from "../../types/Category";
import ProductCategoryItem from "../../components/ProductCategoryItem";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
  },
  filterBarContainer: {
    gap: 8,
    padding: 12,
  },
  searchBarContainer: {
    flexDirection: "row",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 12,
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    getProductsData();
    getProductsCategories();
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

  const getProductsCategories = () => {
    axios
      .get(`${Constants.baseUrl}/products/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.log(error));
  };

  const filterProductsByQuery = (value: string) => {
    setQuery(value);
    setFilteredData(
      data.filter((product) => product.title.toLowerCase().includes(value))
    );
  };

  const renderItem: ListRenderItem<Product> = ({ item: product }) => (
    <ExploreProductItem product={product} key={product.id} />
  );

  console.log(selectedCategory);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.searchBarContainer}>
          <Feather name="search" color={Colors.grey} size={12} />
          <TextInput
            value={query}
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor={Colors.grey}
            cursorColor={Colors.grey}
            onChangeText={(value) => filterProductsByQuery(value)}
          />
        </View>
        <ScrollView
          horizontal={true}
          overScrollMode="never"
          contentContainerStyle={styles.filterBarContainer}
        >
          {categories.map((category) => {
            return (
              <ProductCategoryItem
                data={data}
                setFilteredData={setFilteredData}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                key={category}
              />
            );
          })}
        </ScrollView>
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
