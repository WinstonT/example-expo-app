import React, { useCallback } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
  },
  container: {
    flexDirection: "row",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  inputBar: {
    flex: 1,
    height: 40,
    padding: 8,
    color: Colors.grey,
  },
});

interface ExploreHeaderProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function ExploreHeader({ setQuery, query }: ExploreHeaderProps) {
  const onChangeText = useCallback(() => {
    setQuery(query);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Feather name="search" color={Colors.grey} size={12} />
        <TextInput
          value={query}
          style={styles.inputBar}
          placeholder="Search"
          placeholderTextColor={Colors.grey}
          cursorColor={Colors.grey}
          onChangeText={onChangeText}
        />
      </View>
    </SafeAreaView>
  );
}
