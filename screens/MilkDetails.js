import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MilkCard from '../Components/MilkCard';
import {milkDetails} from '../api/auth';
import Header from './Header';

const MilkDetails = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await milkDetails();
      console.log(res.data.app_data.data);
      if (res.data.app_data.StatusCode === 6000) {
        console.log(res.data.app_data.data, 'wazeerr_____');
        setDatas(res.data.app_data.data);
      } else {
        setError('Unexpected StatusCode');
      }
    } catch (error) {
      console.error('Error fetching milk details:', error);
      setError('Failed to load data');
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

  return (
    <View style={styles.container}>
      <Header />
      <View style={{marginBottom: 20, paddingHorizontal: 15}}>
        <Text style={styles.head}>Milk Status</Text>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <FlatList
          data={datas}
          renderItem={({item}) => <MilkCard datas={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No milk data available.</Text>
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
    backgroundColor: '#F3F8F9',
    // paddingHorizontal: 16,
    color: '#000',
  },
  head: {
    fontSize: 24,
    color: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
