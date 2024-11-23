import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CowIcon from "../assets/images/cow.png";
import TableData from "../Components/TableData";
import { cowsList } from "../api/auth";
import Header from "../Components/Header";

const Insurance = () => {
  const [cowData, setCowData] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    cowsList().then((res) => {
      if (res.data.app_data.StatusCode === 6000) {
        setCowData(res.data?.app_data.data);
      }
      setRefresh(false);
    });
  }, [refresh]);

  const renderHeader = () => (
    <>
      <View style={styles.topCover}>
        <View style={styles.headCover}>
          <View style={styles.imageContainer}>
            <Image source={CowIcon} />
          </View>
          <Text style={styles.headerText}>Count</Text>
        </View>
        <View style={styles.countDataContainer}>
          <View style={styles.cardData}>
            <View>
              <Text style={styles.cardDataText}>Total</Text>
            </View>
            <View style={styles.cowsCountRow}>
              <Text style={styles.cowsCount}>{cowData?.cows_count || 0}</Text>
              <Text style={styles.cowsText}>cows</Text>
            </View>
          </View>

          <View style={styles.cardData}>
            <View>
              <Text style={styles.cardDataText}>Insured cows</Text>
            </View>
            <View style={styles.cowsCountRow}>
              <Text style={styles.cowsCount}>
                {cowData?.insured_cow_count || 0}
              </Text>
              <Text style={styles.cowsText}>cows</Text>
            </View>
          </View>

          <View style={styles.cardData}>
            <View>
              <Text style={styles.cardDataText}>Uninsured cows</Text>
            </View>
            <View style={styles.cowsCountRow}>
              <Text style={styles.cowsCount}>
                {cowData?.uninsured_count || 0}
              </Text>
              <Text style={styles.cowsText}>cows</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.topCover}>
        <View style={styles.headCover}>
          <View style={styles.imageContainer}>
            <Image source={CowIcon} />
          </View>
          <Text style={styles.headerText}>Details</Text>
        </View>
        <View style={styles.dataHead}>
          <Text style={{ width: "10%", color: "#9FA6AA" }}>No</Text>
          <Text style={{ width: "20%", color: "#9FA6AA" }}>Name</Text>
          <Text style={{ width: "20%", color: "#9FA6AA" }}>Breed</Text>
          <Text style={{ width: "10%", color: "#9FA6AA" }}>Age</Text>
          <Text style={{ width: "25%", color: "#9FA6AA" }}>Insurance</Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      <Header />
      <FlatList
        data={cowData}
        renderItem={({ item, index }) => (
          <TableData
            no={index + 1}
            name={item.name}
            breed={item.breed}
            age={item.age < 10 ? `0${item.age}` : item.age}
            insurance={item.insured ? "Insured" : "Uninsured"}
            key={index}
          />
        )}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refresh}
        contentContainerStyle={styles.container}
        onRefresh={() => {
          setRefresh(!refresh);
        }}
      />
    </>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#F3F8F9",
    flex: 1,
  },
  imageContainer: {
    padding: 8,
    backgroundColor: "#EAF7FA",
    borderRadius: 6,
  },
  headerText: {
    color: "#6E7475",
    fontWeight: "600",
    fontSize: 16,
  },
  countDataContainer: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headCover: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topCover: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E3F5FF",
  },
  cardData: {},
  cardDataText: {
    color: "#878787",
    fontSize: 14,
    paddingBottom: 7,
  },
  cowsCountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cowsCount: {
    color: "#4A4D4E",
    fontSize: 22,
    fontWeight: "600",
  },
  cowsText: {
    color: "#878787",
    fontSize: 16,
  },
  dataHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
