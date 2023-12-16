import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "../../components/Themed";
import ExploreHeader from "../../components/ExploreHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ExploreProductsList from "../../components/ExploreProductsList";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Stack.Screen options={{ header: () => <ExploreHeader /> }} />
      <ExploreProductsList />
    </SafeAreaView>
  );
}
