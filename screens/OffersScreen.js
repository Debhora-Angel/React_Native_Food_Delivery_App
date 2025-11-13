import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OffersScreen() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [countdown, setCountdown] = useState(300); // 5 mins flash timer

  // ⏰ Flash Deal Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const copyToClipboard = async (code) => {
    await Clipboard.setStringAsync(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // 🎟 Offers Data
  const offers = [
    { id: 1, title: "20% OFF On First Order", code: "FIRSTORDER20", expiry: "Nov 30", tag: "💚 New" },
    { id: 2, title: "Flat ₹100 OFF Above ₹499", code: "SAVE100", expiry: "Dec 5", tag: "🔥 Trending" },
    { id: 3, title: "Free Delivery on Weekends", code: "FREESHIP", expiry: "Nov 20", tag: "🚚 Limited" },
  ];

  const bankOffers = [
    { id: 1, title: "10% OFF with HDFC Credit Cards", code: "HDFCFOOD", expiry: "Nov 30" },
    { id: 2, title: "5% Cashback on Paytm UPI", code: "PAYTM5", expiry: "Dec 10" },
  ];

  const restaurantOffers = [
    { id: 1, title: "Buy 1 Get 1 Pizza at Pizza Corner 🍕", code: "PIZZABOGO", expiry: "Nov 25" },
    { id: 2, title: "Free Fries at Burger Hub 🍟", code: "FREEFRIES", expiry: "Nov 18" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🏆 Rewards Section */}
        <LinearGradient colors={["#C9E4C5", "#A5D6A7"]} style={styles.rewardsCard}>
          <Ionicons name="trophy" size={40} color="#2E7D32" />
          <View>
            <Text style={styles.rewardTitle}>You have 240 Grubbit Points 🏆</Text>
            <Text style={styles.rewardSubtitle}>Redeem for discounts or free delivery!</Text>
          </View>
        </LinearGradient>

        {/* 🎟 Active Offers */}
        <Text style={styles.sectionTitle}>Active Offers</Text>
        {offers.map((offer) => (
          <LinearGradient
            key={offer.id}
            colors={["#A8E6CF", "#DCEDC1"]}
            style={styles.offerCard}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerExpiry}>Expires {offer.expiry}</Text>
                <Text style={styles.offerTag}>{offer.tag}</Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard(offer.code)}>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>
                    {copiedCode === offer.code ? "Copied!" : offer.code}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ))}

        {/* 💳 Bank / Payment Offers */}
        <Text style={styles.sectionTitle}>Bank & Payment Offers</Text>
        {bankOffers.map((bank) => (
          <View key={bank.id} style={styles.bankCard}>
            <Ionicons name="card-outline" size={28} color="#2E7D32" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.bankTitle}>{bank.title}</Text>
              <Text style={styles.bankExpiry}>Valid till {bank.expiry}</Text>
            </View>
            <TouchableOpacity onPress={() => copyToClipboard(bank.code)}>
              <Text style={styles.bankCode}>{copiedCode === bank.code ? "Copied!" : bank.code}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* 🍔 Restaurant Offers */}
        <Text style={styles.sectionTitle}>Restaurant Specials</Text>
        {restaurantOffers.map((res) => (
          <View key={res.id} style={styles.restaurantCard}>
            <Text style={styles.restaurantTitle}>{res.title}</Text>
            <View style={styles.restaurantFooter}>
              <Text style={styles.restaurantExpiry}>Valid till {res.expiry}</Text>
              <TouchableOpacity onPress={() => copyToClipboard(res.code)}>
                <Text style={styles.restaurantCode}>
                  {copiedCode === res.code ? "Copied!" : res.code}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ⏰ Flash Deals */}
        <Text style={styles.sectionTitle}>Flash Deals ⏰</Text>
        <LinearGradient colors={["#FFECB3", "#FFF9C4"]} style={styles.flashCard}>
          <Text style={styles.flashTitle}>🔥 50% OFF Burgers — Hurry Up!</Text>
          <Text style={styles.flashTimer}>Ends in {formatTime(countdown)}</Text>
          <TouchableOpacity style={styles.flashButton}>
            <Text style={styles.flashButtonText}>Order Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* ❓ FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          <Text style={styles.faqQuestion}>❓ How do I apply a coupon?</Text>
          <Text style={styles.faqAnswer}>Enter the code at checkout under “Apply Coupon”.</Text>

          <Text style={styles.faqQuestion}>💸 Why is my offer not working?</Text>
          <Text style={styles.faqAnswer}>It may have expired or not meet the minimum order value.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rewardsCard: {
    margin: 15,
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },
  rewardSubtitle: {
    fontSize: 14,
    color: "#37513C",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
  },
  offerCard: {
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E4A26",
  },
  offerExpiry: {
    fontSize: 12,
    color: "#555",
  },
  offerTag: {
    marginTop: 4,
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },
  codeBox: {
    backgroundColor: "#2E7D32",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  codeText: {
    color: "#fff",
    fontWeight: "600",
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  bankTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E4A26",
  },
  bankExpiry: {
    fontSize: 12,
    color: "#555",
  },
  bankCode: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: "600",
  },
  restaurantCard: {
    backgroundColor: "#F0F8F5",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  restaurantTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E4A26",
  },
  restaurantFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  restaurantExpiry: {
    color: "#777",
    fontSize: 12,
  },
  restaurantCode: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  flashCard: {
    margin: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  flashTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5D4037",
  },
  flashTimer: {
    fontSize: 14,
    color: "#795548",
    marginVertical: 6,
  },
  flashButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  flashButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  faqSection: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  faqQuestion: {
    fontWeight: "700",
    fontSize: 15,
    marginTop: 10,
    color: "#2E4A26",
  },
  faqAnswer: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },
});
