import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SingleHeader from "../Components/SingleHeader";
import TabSwitcher from "../Components/TabSwitcher";
import api from "../api";
import { FlatList } from "react-native";
import NotificationCard from "../Components/NotificationCard";

const Notifications = () => {
  const [activetab, setActiveTab] = useState("society");
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `activities/list-notifications/?notification_by=${activetab}`
      );
      setNotifications(response.data.app_data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activetab, refresh]);

  return (
    <View style={{ flex: 1 }}>
      <SingleHeader title={"Notifications"} />
      <TabSwitcher
        tabs={[
          { key: "society", label: "Society" },
          { key: "plant", label: "Plant" },
        ]}
        onTabChange={(item) => setActiveTab(item)}
      />
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refresh}
        onRefresh={() => setRefresh(!refresh)}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.errorText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  errorText: {
    color: "#49BFD4",
    fontSize: 18,
    fontWeight: "500",
  },
});
