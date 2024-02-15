import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Constants from "../../constants/Constants";
import User from "../../types/User";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    marginBottom: 32,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  avatarContainer: {
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 20,
    textTransform: "capitalize",
    textAlign: "center",
  },
  userName: {
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: Colors.white,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    flexGrow: 1,
    marginTop: 40,
    padding: 24,
  },
  statisticsRow: {
    flexDirection: "row",
    marginVertical: 12,
    justifyContent: "space-around",
  },
  statisticsLabel: {
    textAlign: "center",
  },
  statisticsValue: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  accountLabel: {
    marginTop: 12,
    color: Colors.grey,
    fontWeight: "700",
  },
  information: {
    fontSize: 16,
  },
  filler: {
    flex: 1,
  },
  signOutButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  signOutButtonLabel: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default function ProfileScreen() {
  const [user, setUser] = useState<User>();
  const address = `${user?.address.number} ${user?.address.street}, ${user?.address.city} City, ${user?.address.zipcode}`;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${Constants.baseUrl}/users/${Constants.userId}`)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <AntDesign name="user" size={100} />
        </View>
        <Text
          style={styles.name}
        >{`${user?.name.firstname} ${user?.name.lastname}`}</Text>
        <Text style={styles.userName}>{`@${user?.username}`}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.statisticsRow}>
          <View>
            <Text style={styles.statisticsLabel}>Followers</Text>
            <Text style={styles.statisticsValue}>110K</Text>
          </View>
          <View>
            <Text style={styles.statisticsLabel}>Purchases</Text>
            <Text style={styles.statisticsValue}>52</Text>
          </View>
          <View>
            <Text style={styles.statisticsLabel}>Reviews</Text>
            <Text style={styles.statisticsValue}>20</Text>
          </View>
        </View>
        <Text style={styles.accountLabel}>Email</Text>
        <Text style={styles.information}>{user?.email}</Text>
        <Text style={styles.accountLabel}>Phone</Text>
        <Text style={styles.information}>{`+${user?.phone}`}</Text>
        <Text style={styles.accountLabel}>Address</Text>
        <Text style={[styles.information, { textTransform: "capitalize" }]}>
          {address}
        </Text>
        <View style={styles.filler}></View>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonLabel}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
