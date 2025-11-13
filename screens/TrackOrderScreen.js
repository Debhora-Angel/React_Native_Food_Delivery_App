import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function TrackOrderScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(1);

  // Initial delivery location
  const deliveryLocation = useRef(
    new AnimatedRegion({
      latitude: 17.4065,
      longitude: 78.4772,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  ).current;

  // Route simulation points
  const routePoints = [
    { latitude: 17.4065, longitude: 78.4772 },
    { latitude: 17.408, longitude: 78.48 },
    { latitude: 17.41, longitude: 78.4825 },
    { latitude: 17.412, longitude: 78.485 },
  ];

  useEffect(() => {
    let timer;
    if (progress < 4) {
      timer = setTimeout(() => setProgress(progress + 1), 3000);
    }
    return () => clearTimeout(timer);
  }, [progress]);

  // Move Marker
  useEffect(() => {
    if (progress === 3) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < routePoints.length) {
          deliveryLocation.timing(routePoints[i]).start();
          i++;
        } else {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [progress]);

  const statuses = [
    { id: 1, label: "Order Confirmed", icon: "checkmark-circle" },
    { id: 2, label: "Restaurant Preparing", icon: "restaurant" },
    { id: 3, label: "Out for Delivery", icon: "bicycle" },
    { id: 4, label: "Delivered", icon: "home" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Order</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* MAP */}
        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 17.4065,
              longitude: 78.4772,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker.Animated coordinate={deliveryLocation}>
              <Image
                source={require("../assets/delivery.png")}
                style={{ width: 50, height: 50 }}
              />
            </Marker.Animated>
          </MapView>
        </View>

        {/* STATUS TIMELINE */}
        <View style={styles.timelineCard}>
          <Text style={styles.statusHeader}>Order Status</Text>

          {statuses.map((step) => (
            <View key={step.id} style={styles.timelineItem}>
              <Ionicons
                name={step.icon}
                size={26}
                color={progress >= step.id ? "#2E7D32" : "#AAA"}
              />

              <View style={{ marginLeft: 12 }}>
                <Text
                  style={[
                    styles.statusText,
                    { color: progress >= step.id ? "#2E7D32" : "#888" },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Home",
              params: { screen: "HomeMain" },
            })
          }
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
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
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E4A26",
  },

  mapCard: {
    width: "90%",
    height: 350,
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
    backgroundColor: "#ddd",
    elevation: 4,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  timelineCard: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F8FDF7",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    elevation: 2,
  },
  statusHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#2E4A26",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },

  homeButton: {
    backgroundColor: "#2E7D32",
    width: "85%",
    alignSelf: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
});
