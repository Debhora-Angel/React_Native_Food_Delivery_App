import React from "react";
import { View, Text } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import SupportScreen from "./screens/SupportScreen";
import AccountDetails from "./screens/AccountDetails";
import LoginScreen from "./screens/LoginScreen"; 
import MyOrdersScreen from "./screens/MyOrdersScreen";
import OffersScreen from "./screens/OffersScreen";
import PaymentMethodsScreen from "./screens/PaymentMethodsScreen";
import TrackOrderScreen from "./screens/TrackOrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
       <Stack.Screen name="Offers" component={OffersScreen} />
    

    </Stack.Navigator>
  );
}


function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          headerShown: true,
          title: "Account Details",
          headerStyle: { backgroundColor: "#C9E4C5" },
          headerTintColor: "#2E7D32",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={SupportScreen}
        options={{
          headerShown: true,
          title: "Help Center",
          headerStyle: { backgroundColor: "#C9E4C5" },
          headerTintColor: "#2E7D32",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen 
      name="PaymentMethods" 
      component={PaymentMethodsScreen}
        options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}


function CartIconWithBadge({ color }) {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View>
      <Ionicons name="cart-outline" size={22} color={color} />
      {itemCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -8,
            top: -5,
            backgroundColor: "green",
            borderRadius: 10,
            width: 18,
            height: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {itemCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 65,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color }) => {
          if (route.name === "Cart") {
            //  Custom Cart icon with badge
            return <CartIconWithBadge color={color} />;
          }

          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "MyOrders") iconName = "receipt-outline"; 
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#2e7d32",
        tabBarInactiveTintColor: "#777",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MyOrders" component={MyOrdersScreen} /> 
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />     
              <Stack.Screen name="MainTabs" component={MainTabs} />     
              <Stack.Screen name="TrackOrder" component={TrackOrderScreen} /> 
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

