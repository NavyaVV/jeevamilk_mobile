import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Logo from "../assets/logo/logo_white.png";
import MilkImg from "../assets/icons/milk.png";

const WelcomeCard = () => {
  return (
    <View>
      <View style={styles.cover}>
        <Text style={styles.welcomenote}>Welcome to,</Text>
        <View style={styles.left}>
          <Image source={Logo} />
          <Text style={styles.logo}>Jeeva Milk</Text>
        </View>
        <Image style={styles.abs_image} source={MilkImg} />
      </View>
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "#60CFE2",
    height: 115,
    borderRadius: 10,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  welcomenote: {
    color: "#fff",
    fontSize: 18,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
  },
  left: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
  },
  abs_image: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 310,
  },
});
