import axios from "axios";
import React, { useEffect, useState } from "react";
import Constants from "../../constants/Constants";
import Product from "../../types/Product";
import Cart from "../../types/Cart";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import CartItem from "../../components/CartItem";

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
  },
});

interface CartProduct {
  productId: number;
}

export default function CartScreen() {
  const [isLoading, setLoading] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setLoading(true);

    const response = await axios
      .get(`${Constants.baseUrl}/carts/${Constants.userId}`)
      .then((res) => {
        setCart(res.data);
        return res.data.products;
      })
      .catch((error) => console.log(error));

    const data = await Promise.all(
      response.map(async ({ productId }: CartProduct) => {
        console.log(productId);
        return axios
          .get(`${Constants.baseUrl}/products/${productId}`)
          .then((res) => {
            return res.data;
          });
      })
    );

    setProducts(data);
    setLoading(false);
  };

  const renderItem: ListRenderItem<Product> = ({ item: product, index }) => (
    <CartItem index={index} cart={cart} product={product} />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}
