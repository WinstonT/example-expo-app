import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet, Image } from "react-native";
import Product from "../types/Product";
import Cart from "../types/Cart";
import Colors from "../constants/Colors";
import moment from "moment";

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
    fontSize: 12,
    color: Colors.grey,
  },
  price: {
    fontWeight: "700",
    color: Colors.primary,
  },
});

interface CartItemProps {
  index: number;
  cart?: Cart;
  product: Product;
}

export default function CartItem({ index, cart, product }: CartItemProps) {
  const { image, title } = product;

  const formattedDate = moment(cart?.date).format("ddd, DD MMM yyyy");
  const quantity = cart?.products[index].quantity;
  const formattedPrice = parseFloat(product.price).toFixed(2);
  const totalPrice = parseFloat(
    String(Number(formattedPrice) * Number(cart?.products[index].quantity))
  ).toFixed(2);

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
          <Text style={styles.quantity}>
            {`${quantity} x $${formattedPrice}`}
          </Text>
          <Text style={styles.price}>{`$${totalPrice}`}</Text>
        </View>
      </View>
    </View>
  );
}
