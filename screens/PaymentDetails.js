import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../Components/Header";
import { BackIcon, TimeIcon } from "../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { BankIcon, CalenderIcon, PaymentReceivedIcon } from "../assets/images";
import { COLORS } from "../Components/constants/constants";

const PaymentDetails = ({ route }) => {
  const { id } = route.params.data;
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = api.get(
          `payments/single-farmer-payment-history/${id}/`
        );
        if (response.data.app_data.StatusCode === 6000) {
          setDetails(response.data.app_data.data);
        } else if (response.data.app_data.StatusCode === 6001) {
          console.log(response.data.app_data.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const navigation = useNavigation();

  const TopHeader = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={BackIcon} />
      </TouchableOpacity>
      <View>
        <Text style={{ color: "#181818", fontSize: 24, fontWeight: "500" }}>
          Payment Details
        </Text>
      </View>
      <View style={{ width: 10 }} />
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#F3F8F9" }}>
      <Header />
      <View>
        <TopHeader />
        <View style={{ paddingHorizontal: 15, paddingTop: 45 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, color: "#4A4D4E", fontWeight: "500" }}>
              Milk amount
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color: "#747474" }}>{details?.created_at}</Text>
              <Image source={TimeIcon} />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "#747474" }}>{details?.detail}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.cover}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: COLORS.icon_bg_color,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                  }}
                >
                  <Image source={PaymentReceivedIcon} />
                </View>
                <View>
                  <Text style={{ color: "#747474", fontSize: 16 }}>
                    Milk Amount
                  </Text>
                  <Text style={{ fontSize: 24, color: "#4A4D4E" }}>
                    ₹{details.amount}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 5 }}>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Text style={{ color: "#747474", fontSize: 16 }}>
                    {details.created_at}
                  </Text>
                  <Image source={CalenderIcon} />
                </View>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Text style={{ color: "#747474", fontSize: 16 }}>
                    Credited
                  </Text>
                  <Image source={BankIcon} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  cover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
