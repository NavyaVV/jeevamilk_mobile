import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MilkCard from "../Components/MilkCard";
import { milkDetails } from "../api/auth";
import Header from "../Components/Header";

const MilkDetails = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await milkDetails();

      if (res.data.app_data.StatusCode === 6000) {
        setDatas(res.data.app_data.data);
      } else {
        setError("Unexpected StatusCode");
      }
    } catch (error) {
      console.error("Error fetching milk details:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return <MilkCard datas={item} />;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>Milk Status</Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <FlatList
          data={datas}
          renderItem={renderItem}
          keyExtractor={
            (item, index) => `${item.created_at}-${index}` // Combine `created_at` with the index for uniqueness
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          initialNumToRender={10}
          windowSize={5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No milk data available.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default MilkDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F9",
    color: "#000",
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15, 
  },
  headerTxt: {
    fontSize: 24,
    color: "#181818",
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
