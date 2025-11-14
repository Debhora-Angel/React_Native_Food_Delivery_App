import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();

  const paymentMethods = [
    {
      id: "1",
      title: "Cash on Delivery (COD)",
      icon: "cash-outline",
    },
    {
      id: "2",
      title: "Debit Card",
      icon: "card-outline",
    },
    {
      id: "3",
      title: "Credit Card",
      icon: "card-outline",
    },
    {
      id: "4",
      title: "UPI / Wallet",
      icon: "wallet-outline",
      upiOptions: [
        {
          id: "4-1",
          name: "PhonePe",
          image:
            "https://i.pinimg.com/736x/b1/5d/fc/b15dfc9f11992f147703c4b1ff45ea8a.jpg",
        },
        {
          id: "4-2",
          name: "Google Pay",
          image:
            "https://i.pinimg.com/736x/d5/e0/35/d5e035065d6e7888fb46facb45ee1296.jpg",
        },
        {
          id: "4-3",
          name: "Paytm",
          image:
            "https://i.pinimg.com/1200x/e9/9c/11/e99c1127e426501bddeb9968ffa99223.jpg",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/*  Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      {/* Payment Methods List */}
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={24} color="#2E7D32" />
              <Text style={styles.cardType}>{item.title}</Text>
            </View>

            {/*  Nested UPI Options */}
            {item.upiOptions && (
              <View style={styles.upiContainer}>
                {item.upiOptions.map((upi) => (
                  <View key={upi.id} style={styles.upiItem}>
                    <Image source={{ uri: upi.image }} style={styles.upiIcon} />
                    <Text style={styles.upiText}>{upi.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C9E4C5",
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
    gap: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E4A26",
  },
  cardItem: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  upiContainer: {
    marginTop: 10,
    paddingLeft: 36,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  upiItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  upiIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },
  upiText: {
    fontSize: 15,
    color: "#2E4A26",
    fontWeight: "500",
  },
});
