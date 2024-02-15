import React, { useCallback, useState } from "react";
import { Text, View } from "./Themed";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Product from "../../types/Product";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import ProductDetailsModal from "./ProductDetailsModal";

interface ExploreProductItemProps {
  product: Product;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    backgroundColor: Colors.white,
    marginBottom: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 12,
    flexDirection: "row",
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: "space-between",
  },
  informationContainer: {
    justifyContent: "space-around",
    textAlign: "left",
  },
  title: {
    flexWrap: "wrap",
    fontSize: 16,
    fontWeight: "700",
  },
  ratingContainer: {
    flexDirection: "row",
    verticalAlign: "bottom",
    marginTop: 4,
  },
  rating: {
    color: Colors.grey,
    marginRight: 4,
  },
  star: {
    verticalAlign: "middle",
  },
  count: {
    color: Colors.grey,
    marginLeft: 4,
  },
  price: {
    fontWeight: "700",
    color: Colors.primary,
  },
  imageContainer: {
    justifyContent: "center",
    marginRight: 16,
    borderColor: Colors.grey,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
});

export default function ExploreProductItem({
  product,
}: ExploreProductItemProps) {
  const {
    title,
    image,
    rating: { rate, count },
  } = product;
  const price = parseFloat(product.price).toFixed(2);

  const [isModalVisible, setModalVisible] = useState(false);

  const onPress = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={[styles.imageContainer]}>
          <Image
            resizeMode="center"
            source={{ uri: image }}
            height={52}
            width={52}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.informationContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{rate}</Text>
              <FontAwesome
                name="star"
                size={12}
                style={styles.star}
                color={Colors.grey}
              />
              <Text style={styles.count}>{`| ${count} reviews`}</Text>
            </View>
          </View>
          <Text style={styles.price}>{`$${price}`}</Text>
        </View>
      </TouchableOpacity>
      <ProductDetailsModal
        isVisible={isModalVisible}
        product={product}
        setVisible={setModalVisible}
      />
    </>
  );
}
