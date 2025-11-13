import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const total = route.params?.total ?? 0;

  const [selected, setSelected] = React.useState("COD");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.title}>Select Payment Method</Text>

      {/* Payment Methods */}
      <TouchableOpacity
        style={[styles.option, selected === "COD" && styles.selected]}
        onPress={() => setSelected("COD")}
      >
        <Ionicons name="cash-outline" size={24} color="#2E7D32" />
        <Text style={styles.optionText}>Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === "UPI" && styles.selected]}
        onPress={() => setSelected("UPI")}
      >
        <Ionicons name="logo-google" size={24} color="#1565C0" />
        <Text style={styles.optionText}>UPI (PhonePe / Google Pay / Paytm)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, selected === "Card" && styles.selected]}
        onPress={() => setSelected("Card")}
      >
        <Ionicons name="card-outline" size={24} color="#8E24AA" />
        <Text style={styles.optionText}>Debit / Credit Card</Text>
      </TouchableOpacity>

      {/* Total Amount */}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => navigation.navigate("OrderSuccess")}
      >
        <Text style={styles.payText}>Complete Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#2E4A26",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  selected: {
    borderWidth: 2,
    borderColor: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  totalBox: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#E8F5E9",
    padding: 18,
    borderRadius: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#555",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 5,
  },
  payBtn: {
    backgroundColor: "#2E7D32",
    margin: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
