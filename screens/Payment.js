import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {COLORS} from '../Components/constants/constants';
import PaymentCard from '../Components/PaymentCard';
import api from '../api';
import Header from './Header';

export default function Payment({navigation}) {
  const [paymentData, setPaymentData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPaymentData = async () => {
    setRefreshing(true);
    try {
      const response = await api.get('payments/farmer-payment-history/');
      console.log(response.data.app_data, '_____test');
      if (response.data.app_data.StatusCode === 6000) {
        setPaymentData(response.data.app_data.data);
      } else {
        console.error(
          'Unexpected StatusCode:',
          response.data.app_data.StatusCode,
        );
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>Payments</Text>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <FlatList
          data={paymentData}
          renderItem={({item}) => <PaymentCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={fetchPaymentData}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No payment data available.</Text>
          }
          contentContainerStyle={
            paymentData.length === 0 ? styles.emptyContainer : null
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: '#F3F8F9',
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text_color,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
