import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "../../components/Themed";
import ExploreHeader from "../../components/ExploreHeader";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ header: () => <ExploreHeader /> }} />
    </SafeAreaView>
  );
}
