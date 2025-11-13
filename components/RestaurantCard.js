import React, { useRef } from "react";
import { Animated, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantCard({ restaurant }) {
  const navigation = useNavigation();
  const liftAnim = useRef(new Animated.Value(0)).current; // for elevation

  const handlePressIn = () => {
    Animated.spring(liftAnim, {
      toValue: -50, // move slightly upward
      useNativeDriver: true,
      friction: 5,
      shadowOpacity: 0.25,
      shadowRadius: 10,

    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(liftAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { restaurant })}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          backgroundColor: "#fff",
          marginRight: 15,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
          width: 220,
          transform: [{ translateY: liftAnim }],
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <Image
          source={{ uri: restaurant.image }}
          style={{
            width: "100%",
            height: 120,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#2E4A26" }}>
            {restaurant.name}
          </Text>
          <Text style={{ color: "#777", marginVertical: 2 }}>
            {restaurant.cuisine}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={{ marginLeft: 4, color: "#555" }}>
              {restaurant.rating}
            </Text>
            <Text style={{ marginLeft: 10, color: "#777" }}>
              {restaurant.time}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
