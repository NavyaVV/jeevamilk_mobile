import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleHeader from './SingleHeader';
import TabSwitcher from '../Components/TabSwitcher';
import api from '../api';
import {FlatList} from 'react-native-gesture-handler';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  const [activetab, setActiveTab] = useState('society');
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `activities/list-notifications/?notification_by=${activetab}`,
        );
        setNotifications(response.data.app_data.data);
        setRefresh(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [activetab, refresh]);
  return (
    <View>
      <SingleHeader title={'Notifications'} />
      <TabSwitcher
        tabs={[
          {key: 'society', label: 'Society'},
          {key: 'plant', label: 'Plant'},
        ]}
        onTabChange={item => setActiveTab(item)}
      />
      <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => setRefresh(true)}
        refreshing={refresh}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
