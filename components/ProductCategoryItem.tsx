import React, { useCallback } from "react";
import { Text } from "./Themed";
import Category from "../types/Category";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Product from "../types/Product";

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
    verticalAlign: "middle",
  },
  title: {
    textTransform: "capitalize",
  },
});

interface ProductCategoryItemProps {
  data: Product[];
  category: Category;
  selectedCategory: Category | null;
  setFilteredData: (data: Product[]) => void;
  setSelectedCategory: (value: Category | null) => void;
}

function setColor(isSelected: boolean, type: "text" | "border"): string {
  if (isSelected) {
    return Colors.primary;
  }
  return type == "text" ? Colors.black : Colors.grey;
}

export default function ProductCategoryItem({
  data,
  category,
  selectedCategory,
  setSelectedCategory,
  setFilteredData,
}: ProductCategoryItemProps) {
  const isSelected = selectedCategory === category;

  const onPress = useCallback(() => {
    if (!isSelected) {
      setSelectedCategory(category);
      setFilteredData(data.filter((product) => product.category == category));
    } else {
      setSelectedCategory(null);
      setFilteredData(data);
    }
  }, [isSelected, selectedCategory, setSelectedCategory, setFilteredData]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: setColor(isSelected, "border") },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: setColor(isSelected, "text") }]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
}
