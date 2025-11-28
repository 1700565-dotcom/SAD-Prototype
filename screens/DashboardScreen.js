// -------------------------
// File: src/screens/DashboardScreen.js
// -------------------------
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ name, onChooseRole, onLogout }) {
  return (
    <View style={styles.container}>
      {/* TOP BAR WITH LOGOUT */}
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Welcome, {name}</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerSubtitle}>Select your GoSafeLink Role</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ACTION CARDS */}
        <View style={styles.cards}>
          {/* Reporter */}
          <TouchableOpacity
            onPress={() => onChooseRole("reporter")}
            activeOpacity={0.9}
            style={[styles.card, styles.reportCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="megaphone" size={40} color="#fff" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Barangay / Citizen Reporter</Text>
                <Text style={styles.cardSubtitle}>
                  Submit reports and request assistance
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Admin */}
          <TouchableOpacity
            onPress={() => onChooseRole("admin")}
            activeOpacity={0.9}
            style={[styles.card, styles.adminCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="settings" size={40} color="#fff" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>CDRRMO Admin</Text>
                <Text style={styles.cardSubtitle}>
                  Manage reports, hazards, and resources
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Responder */}
          <TouchableOpacity
            onPress={() => onChooseRole("responder")}
            activeOpacity={0.9}
            style={[styles.card, styles.responderCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="medkit" size={40} color="#fff" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Emergency Responder</Text>
                <Text style={styles.cardSubtitle}>
                  Receive alerts and assist citizens
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // small space between icon and text
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },

  content: {
    padding: 20,
    gap: 25,
  },

  // HEADER
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 2,
    marginHorizontal: 20,
  },

  // CARDS
  cards: {
    gap: 18,
  },
  card: {
    borderRadius: 25,
    padding: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  reportCard: {
    backgroundColor: "#2563eb",
  },
  adminCard: {
    backgroundColor: "#10b981",
  },
  responderCard: {
    backgroundColor: "#f59e0b",
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
});