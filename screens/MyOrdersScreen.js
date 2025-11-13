import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function MyOrdersScreen() {
  const navigation = useNavigation();

  const orders = [
    {
      id: "1",
      restaurant: "Domino's Pizza",
      item: "Margherita Pizza",
      date: "Dec 10, 2025",
      price: "$29.9",
      status: "Delivered",
      image:
        "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
    },
    {
      id: "2",
      restaurant: "Burger King",
      item: "Veg Burger Combo",
      date: "Dec 11, 2025",
      price: "$10.99",
      status: "Ongoing",
      image:
        "https://i.pinimg.com/1200x/73/fc/ab/73fcab1d3a2c715f241ecec234fc517d.jpg",
    },
    {
      id: "3",
      restaurant: "Paradise Biryani",
      item: "Chicken Biryani",
      date: "Dec 5, 2025",
      price: "$35.90",
      status: "Cancelled",
      image:
        "https://i.pinimg.com/736x/a2/be/00/a2be0042e23c190103fa268adb34c410.jpg",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#2E7D32";
      case "Ongoing":
        return "#FB8C00";
      case "Cancelled":
        return "#D32F2F";
      default:
        return "#777";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Order List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.details}>
              <Text style={styles.restaurant}>{item.restaurant}</Text>
              <Text style={styles.item}>{item.item}</Text>
              <Text style={styles.date}>Ordered on {item.date}</Text>

              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(item.status) },
                ]}
              >
                ● {item.status}
              </Text>

              <View style={styles.footerRow}>
                <Text style={styles.price}>{item.price}</Text>

                <TouchableOpacity style={styles.reorderBtn}>
                  <Ionicons name="refresh-outline" size={16} color="#fff" />
                  <Text style={styles.reorderText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    gap: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E4A26",
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    overflow: "hidden",
      height: 150,  
  },
 image: {
  width: 110,
   aspectRatio: 0.7,
    borderRadius: 10, 
  resizeMode: "cover",
},

  details: {
    flex: 1,
    padding: 10,
  },
  restaurant: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E4A26",
  },
  item: {
    fontSize: 14,
    color: "#444",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
  status: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  reorderText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
  },
});
