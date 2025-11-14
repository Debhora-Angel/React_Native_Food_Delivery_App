import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const menuItems = [
    { icon: "person-outline", title: "Account Details" },
    { icon: "card-outline", title: "Payment Methods" },
    { icon: "heart-outline", title: "Favorite Orders" },
    { icon: "help-circle-outline", title: "Help Center" },
  ];

  //  Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user"); // clear login data
      Alert.alert("Logged Out", "You have been logged out successfully.");
      navigation.replace("Login"); // go to Login screen
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/07/e2/f0/07e2f050144d90f43b80a4ca47611034.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Jane Hopper</Text>
        <Text style={styles.profileEmail}>jane.hop@email.com</Text>
      </View>

      {/* Menu Items + Logout */}
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === "Help Center") navigation.navigate("HelpCenter");
              if (item.title === "Account Details") navigation.navigate("AccountDetails");
              if (item.title === "Payment Methods") navigation.navigate("PaymentMethods");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={22} color="#2E7D32" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#C9E4C5",
  },
  profileSection: {
    backgroundColor: "#C9E4C5",
    alignItems: "center",
    paddingVertical: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E4A26",
  },
  profileEmail: {
    color: "gray",
  },
  menuItem: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#2E4A26",
  },
  logoutContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
