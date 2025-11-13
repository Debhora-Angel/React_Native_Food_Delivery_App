import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SupportScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleEmail = () => {
    Linking.openURL("mailto:support@yourapp.com?subject=App Support&body=Hi, I need help with...");
  };

  const handleCall = () => {
    Linking.openURL("tel:+911234567890");
  };

  const handleWhatsApp = () => {
    const message = "Hi! I need help regarding my recent order.";
    const phone = "+911234567890";
    Linking.openURL(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by going to the 'Orders' section and tapping on the specific order. Real-time tracking will show your order's current status.",
    },
    {
      question: "What if I receive a wrong item?",
      answer:
        "If you receive a wrong item, please contact our support team immediately through the app or WhatsApp. We'll arrange a replacement or refund right away.",
    },
    {
      question: "How can I cancel my order?",
      answer:
        "You can cancel an order before it's processed by navigating to the 'Orders' screen and selecting 'Cancel Order'. Once dispatched, cancellations aren’t allowed.",
    },
    {
      question: "How to update my delivery address?",
      answer:
        "Go to your Profile > Address section, tap on the existing address, and edit it. For ongoing orders, contact support to make changes.",
    },
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#2E4A26" }}>
          Support
        </Text>

        <Text style={{ color: "#555", marginBottom: 20 }}>
          Need help? Our team is here to assist you with orders, payments, or technical issues.
        </Text>

        {/* Contact Options */}
        <TouchableOpacity
          onPress={handleCall}
          style={styles.contactCard("#E8F5E9")}
        >
          <Ionicons name="call-outline" size={24} color="#2E7D32" />
          <Text style={styles.contactText("#2E7D32")}>Call Us: +91 12345 67890</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEmail}
          style={styles.contactCard("#E3F2FD")}
        >
          <Ionicons name="mail-outline" size={24} color="#1565C0" />
          <Text style={styles.contactText("#1565C0")}>Email Us: support@yourapp.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleWhatsApp}
          style={styles.contactCard("#E0F7FA")}
        >
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
          <Text style={styles.contactText("#128C7E")}>Chat on WhatsApp</Text>
        </TouchableOpacity>

        {/* FAQ Section */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>FAQs</Text>

          {faqs.map((faq, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: 10,
                marginBottom: 10,
                padding: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
              >
                <Text style={{ fontSize: 16, fontWeight: "600", flex: 1, color: "#2E4A26" }}>
                  {faq.question}
                </Text>
                <Ionicons
                  name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>

              {expandedIndex === index && (
                <Text style={{ color: "#555", marginTop: 8, lineHeight: 20 }}>
                  {faq.answer}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  contactCard: (bgColor) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: bgColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  }),
  contactText: (color) => ({
    fontSize: 16,
    marginLeft: 10,
    color,
    fontWeight: "500",
  }),
};
