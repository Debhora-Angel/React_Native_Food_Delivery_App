import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import AccountEdit from "./AccountEdit";
import { useNavigation } from "@react-navigation/native";

export default function AccountDetails() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const user = {
    name: "Jane Hopper",
    email: "jane.hop@email.com",
    phone: "+91 9876543210",
    address: "123, Elm Street, California",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Edit Button (top right corner, below existing header) */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#E8F5E9",
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 14,
          }}
        >
          <Ionicons name="create-outline" size={20} color="#2E7D32" />
          <Text
            style={{
              marginLeft: 6,
              color: "#2E7D32",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display User Details */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        {[
          { label: "Full Name", value: user.name },
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone },
          { label: "Address", value: user.address },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#F9F9F9",
              borderRadius: 12,
              padding: 15,
              marginBottom: 12,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Text style={{ color: "#777", fontSize: 13, marginBottom: 5 }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              {item.value}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Slide-in Edit Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: "100%",
            width: "85%",
            alignSelf: "flex-end",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: "hidden",
          }}
        >
          <AccountEdit />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
