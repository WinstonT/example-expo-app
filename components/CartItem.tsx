import React, { useCallback, useState } from "react";
import { View, Text } from "./Themed";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Product from "../types/Product";
import Cart from "../types/Cart";
import Colors from "../constants/Colors";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: Colors.white,
    marginVertical: 8,
    borderRadius: 24,
    verticalAlign: "middle",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    marginRight: 16,
    borderColor: Colors.grey,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    height: 72,
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.grey,
  },
  priceContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    fontWeight: "700",
  },
  price: {
    fontWeight: "700",
    color: Colors.primary,
  },
  quantitySelectContainer: {
    flexDirection: "row",
  },
  quantitySelectButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
});

interface CartItemProps {
  index: number;
  cart?: Cart;
  product: Product;
  setTotalPrice: (value: React.SetStateAction<number>) => void;
}

export default function CartItem({
  index,
  cart,
  product,
  setTotalPrice,
}: CartItemProps) {
  const { image, title, price } = product;

  const formattedDate = moment(cart?.date).format("ddd, DD MMM yyyy");
  const formattedPrice = parseFloat(price).toFixed(2);

  const [quantity, setQuantity] = useState(cart?.products[index].quantity ?? 1);

  const decreaseQuantity = useCallback(() => {
    setQuantity((value) => {
      if (value === 1) {
        ToastAndroid.show("Removed item from cart", ToastAndroid.SHORT);
      }
      return value - 1;
    });
    setTotalPrice((total) => total - parseFloat(price));
  }, [setQuantity]);

  const increaseQuantity = useCallback(() => {
    setQuantity((value) => value + 1);
    setTotalPrice((total) => total + parseFloat(price));
  }, [setQuantity]);

  if (quantity === 0) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image
          resizeMode="center"
          source={{ uri: image }}
          height={40}
          width={40}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.date}>{`Last viewed on ${formattedDate}`}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{`$${formattedPrice}`}</Text>
          <View style={styles.quantitySelectContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={[styles.quantitySelectButton, { marginRight: 12 }]}
            >
              <Feather name="minus" color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={[styles.quantitySelectButton, { marginLeft: 12 }]}
            >
              <Feather name="plus" color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
