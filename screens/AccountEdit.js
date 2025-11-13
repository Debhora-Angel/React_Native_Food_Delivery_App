import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AccountEdit() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#2E7D32" }}>
          Edit Account Details
        </Text>

        {/* Name */}
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: "#555" }}>Full Name</Text>
          <TextInput
            placeholder="Jane Hopper"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              backgroundColor: "#F9F9F9",
            }}
          />
        </View>

        {/* Email */}
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: "#555" }}>Email</Text>
          <TextInput
            placeholder="jane.hop@email.com"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              backgroundColor: "#F9F9F9",
            }}
            keyboardType="email-address"
          />
        </View>

        {/* Phone */}
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: "#555" }}>Phone</Text>
          <TextInput
            placeholder="+91 9876543210"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              backgroundColor: "#F9F9F9",
            }}
            keyboardType="phone-pad"
          />
        </View>

        {/* Address */}
        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 16, marginBottom: 5, color: "#555" }}>Address</Text>
          <TextInput
            placeholder="123, Elm Street, California"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              backgroundColor: "#F9F9F9",
              height: 100,
              textAlignVertical: "top",
            }}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2E7D32",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
