import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider"; 

export default function SocialSecurityScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <Image
          source={require("../../assets/images/icon.png")} 
          style={styles.logo}
        />
        <Text style={styles.title}>Social Security</Text>
      </View>

      {/* Sliders Section */}
      <View style={styles.slidersContainer}>
        <View style={styles.sliderGroup}>
          <Text style={styles.sliderLabel}>Retirement Age</Text>
          <Slider
            style={styles.slider}
            minimumValue={62}
            maximumValue={70}
            step={1}
            value={65}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1E90FF"
          />
        </View>
        <View style={styles.sliderGroup}>
          <Text style={styles.sliderLabel}>Monthly Benefit</Text>
          <Slider
            style={styles.slider}
            minimumValue={500}
            maximumValue={4000}
            step={100}
            value={2000}
            minimumTrackTintColor="#32CD32"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#32CD32"
          />
        </View>
      </View>

      {/* Graph Section */}
      <View style={styles.graphContainer}>
        <Text style={styles.graphPlaceholder}>[Graph Placeholder]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  slidersContainer: {
    marginVertical: 20,
  },
  sliderGroup: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  graphContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
  },
  graphPlaceholder: {
    fontSize: 18,
    color: "#888",
  },
});
