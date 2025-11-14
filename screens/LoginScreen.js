import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Fake authentication 
    setTimeout(() => {
      if (email.toLowerCase() === "test@gmail.com" && password === "12345") {
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Ionicons name="fast-food-outline" size={64} color="#2E7D32" />
      <Text style={styles.title}>Welcome to Grubbit 🌿</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#777" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me (UI Only) */}
      <TouchableOpacity
        style={styles.rememberContainer}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <Ionicons
          name={rememberMe ? "checkbox" : "square-outline"}
          size={20}
          color="#2E7D32"
        />
        <Text style={styles.rememberText}>Remember Me</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>
        Use <Text style={{ fontWeight: "bold" }}>test@gmail.com</Text> / 12345
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E7D32",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#C9E4C5",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: "#333",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  rememberText: {
    marginLeft: 8,
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: "#666",
  },
});
