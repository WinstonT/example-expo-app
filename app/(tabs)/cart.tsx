import axios from "axios";
import React, { useEffect, useState } from "react";
import Constants from "../../constants/Constants";
import Product from "../../types/Product";
import Cart from "../../types/Cart";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import CartItem from "../components/CartItem";
import { Text, View } from "../components/Themed";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    marginBottom: 8,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 12,
  },
  footer: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalPriceText: {
    fontWeight: "700",
    fontSize: 12,
  },
  totalPriceAmount: {
    fontWeight: "700",
    fontSize: 20,
    color: Colors.primary,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buyButtonLabel: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
  base: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 12,
  },
});

interface CartProduct {
  quantity: number;
  productId: number;
}

export default function CartScreen() {
  const [cart, setCart] = useState<Cart>();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const response: CartProduct[] = await axios
      .get(`${Constants.baseUrl}/carts/${Constants.userId}`)
      .then((res) => {
        setCart(res.data);
        return res.data.products;
      })
      .catch((error) => console.log(error));

    const data = await Promise.all(
      response.map(async ({ productId }: CartProduct) => {
        return axios
          .get(`${Constants.baseUrl}/products/${productId}`)
          .then((res) => {
            return res.data;
          });
      })
    );

    setProducts(data);

    let initialTotalPrice = 0;
    response.forEach(({ quantity }, index) => {
      initialTotalPrice = initialTotalPrice + quantity * data[index].price;
    });
    setTotalPrice(initialTotalPrice);
  };

  const renderItem: ListRenderItem<Product> = ({ item: product, index }) => (
    <CartItem
      index={index}
      cart={cart}
      product={product}
      setTotalPrice={setTotalPrice}
    />
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalPriceText}>Total</Text>
          <Text style={styles.totalPriceAmount}>
            {`$${totalPrice.toFixed(2)}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonLabel}>BUY</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
