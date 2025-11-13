import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function OrderSuccessScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(true);

  useEffect(() => {
    // Clear cart automatically after order placed
    dispatch(clearCart());
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E8F5E9",
                padding: 18,
                borderRadius: 50,
                marginBottom: 15,
              }}
            >
              <Ionicons name="checkmark-circle" size={55} color="#2E7D32" />
            </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                color: "#2E7D32",
                marginBottom: 6,
              }}
            >
              Order Placed!
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#666",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Your delicious food is on the way 🚀
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* Continue Shopping */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("MainTabs", {
                    screen: "Home",
                    params: { screen: "HomeMain" },
                  });
                }}
                style={{
                  backgroundColor: "#2E7D32",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Continue Buying
                </Text>
              </TouchableOpacity>

              {/* Track Order */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("TrackOrder");
                }}
                style={{
                  backgroundColor: "#1565C0",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Track Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
