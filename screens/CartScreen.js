import React from "react";
import { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
export default function OrdersScreen() {
  const navigation = useNavigation();
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
const [modalVisible, setModalVisible] = useState(false);


  // ✅ Calculate total price
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 15 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#2E4A26",
          }}
        >
          Your Orders
        </Text>

        {items.length === 0 ? (
          <Text style={{ color: "#777", textAlign: "center", marginTop: 50 }}>
            Your cart is empty 🛒
          </Text>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#F3F3F3",
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: "#555" }}>₹{item.price}</Text>
                    <Text style={{ color: "#666" }}>Qty: {item.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Text style={{ color: "red", fontWeight: "600" }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Cart Summary Section */}
            <View
              style={{
                backgroundColor: "#E8F5E9",
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#2E4A26" }}
                >
                  Total
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#2E7D32" }}
                >
                  ₹{totalAmount.toFixed(2)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => dispatch(clearCart())}
                  style={{
                    flex: 1,
                    backgroundColor: "#D32F2F",
                    padding: 12,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Payment", { total: totalAmount })}
                style={{
                  flex: 1,
                  backgroundColor: "#2E7D32",
                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Checkout
                </Text>
              </TouchableOpacity>


              </View>
            </View>
          </>
        )}
      </View>

    </SafeAreaView>
    
  );
}
