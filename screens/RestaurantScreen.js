import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const dishes = restaurant.dishes || [];

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Functions updated with unique restaurant–dish IDs
  const addItemToCart = (dish) => {
    const uniqueId = `${restaurant.id}-${dish.id}`;
    dispatch(addToCart({ ...dish, id: uniqueId }));
  };

  const removeItemFromCart = (dish) => {
    const uniqueId = `${restaurant.id}-${dish.id}`;
    dispatch(removeFromCart(uniqueId));
  };

  const getQuantity = (dish) => {
    const uniqueId = `${restaurant.id}-${dish.id}`;
    const item = cartItems.find((item) => item.id === uniqueId);
    return item ? item.quantity : 0;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View>
        <Image
          source={{ uri: restaurant.image }}
          style={{ width: "100%", height: 220 }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 40,
            left: 15,
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 20,
            padding: 6,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#2E4A26" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E4A26" }}>
          {restaurant.name}
        </Text>
        <Text style={{ fontSize: 15, color: "#666", marginTop: 4 }}>
          {restaurant.cuisine}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
        >
          <Ionicons name="star" color="#FFD700" size={18} />
          <Text style={{ marginLeft: 5, color: "#444" }}>
            {restaurant.rating} • {restaurant.time}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 15, marginTop: 10, marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Menu
        </Text>

        {dishes.map((dish) => {
          const quantity = getQuantity(dish);

          return (
            <View
              key={`${restaurant.id}-${dish.id}`}
              style={{
                flexDirection: "row",
                backgroundColor: "#F8F9F8",
                borderRadius: 10,
                marginBottom: 12,
                padding: 10,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: dish.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 12,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#2E4A26" }}
                >
                  {dish.name}
                </Text>
                <Text
                  style={{ fontSize: 13, color: "#666", marginVertical: 4 }}
                >
                  {dish.desc}
                </Text>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#2E7D32" }}
                >
                  ₹{dish.price}
                </Text>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {quantity > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#E8F5E9",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <TouchableOpacity onPress={() => removeItemFromCart(dish)}>
                      <Ionicons
                        name="remove-circle-outline"
                        size={22}
                        color="#2E7D32"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 8,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#2E7D32",
                      }}
                    >
                      {quantity}
                    </Text>
                    <TouchableOpacity onPress={() => addItemToCart(dish)}>
                      <Ionicons
                        name="add-circle-outline"
                        size={22}
                        color="#2E7D32"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => addItemToCart(dish)}
                    style={{
                      backgroundColor: "#70b772ff",
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      ADD +
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
