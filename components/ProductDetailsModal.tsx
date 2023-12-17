import React, { useCallback } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Product from "../types/Product";
import { View, Text } from "./Themed";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingTop: 12,
    justifyContent: "center",
  },
  backButton: {
    marginLeft: 12,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  image: {
    width: "80%",
    height: 240,
  },
  textArea: {
    flexGrow: 2,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingTop: 32,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: Colors.paper,
  },
  row: {
    flexDirection: "row",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginRight: 20,
    width: "70%",
  },
  price: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "700",
    verticalAlign: "bottom",
    marginRight: 8,
  },
  category: {
    marginBottom: 4,
    textTransform: "capitalize",
    color: Colors.primary,
    fontWeight: "700",
  },
  rating: {
    color: Colors.primary,
    fontWeight: "700",
  },
  star: {
    marginTop: 2,
    marginLeft: 4,
    verticalAlign: "middle",
  },
  count: {
    marginLeft: 4,
    color: Colors.grey,
  },
  description: {
    marginTop: 20,
    marginRight: 8,
  },
  filler: {
    flexGrow: 1,
  },
  buttonRow: {
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 24,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  buttonLabel: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

interface ProductDetailsModalProps {
  isVisible: boolean;
  product: Product;
  setVisible: (value: boolean) => void;
}

export default function ProductDetailsModal({
  product,
  isVisible,
  setVisible,
}: ProductDetailsModalProps) {
  const {
    image,
    title,
    description,
    category,
    price,
    rating: { rate, count },
  } = product;

  const onHideModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <Modal presentationStyle="fullScreen" visible={isVisible}>
      <View style={styles.root}>
        <TouchableOpacity onPress={onHideModal} style={styles.backButton}>
          <Feather name="chevron-left" color={Colors.black} size={28} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textArea}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContainer}
            overScrollMode="never"
          >
            <Text style={styles.category}>{category}</Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{`$${parseFloat(price).toFixed(
                2
              )}`}</Text>
            </View>
            <View style={[styles.row, { marginTop: 8 }]}>
              <Text style={styles.rating}>{rate}</Text>
              <FontAwesome
                name="star"
                size={12}
                style={styles.star}
                color={Colors.primary}
              />
              <Text style={styles.count}>{`| ${count} reviews`}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
