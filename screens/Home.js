import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import WelcomeCard from '../Components/WelcomeCard';
import QualityImg from '../assets/icons/quality.png';
import PaintBucket from '../assets/icons/paintbucket.png';
import Ruler from '../assets/icons/ruler.png';
import Design from '../assets/icons/Design.png';
import MoneyImg from '../assets/icons/Money.png';
import { Context } from '../context/Store';
import { homeApi } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Header from './Header';

export default function Home({ navigation }) {
  const { state, dispatch } = useContext(Context);
  const [datas, setDatas] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        console.log(parsedData.access, 'value');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    homeApi().then(res => {
      setDatas(res.data.app_data.data);
      console.log(res.data.app_data.data, 'Data');
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await homeApi();
      setDatas(response.data.app_data.data);
      console.log(response.data.app_data.data, 'Refreshed Data');
    } catch (error) {
      console.error('Refreshing error:', error);
    }
    setRefreshing(false);
  };

  return (
    <>
      <Header />
      <ScrollView
        style={{ paddingHorizontal: 16, backgroundColor: '#F3F8F9' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#49BFD4']}
          />
        }
      >
        <WelcomeCard />
        <View style={styles.container}>
          <Text style={styles.heading}>Milk Reading</Text>
          <View style={styles.StatusCover}>
            <TouchableOpacity style={styles.Card} onPress={() => navigation.navigate('Milkdetails')}>
              <View style={styles.HeadDiv}>
                <View style={styles.iconContainer}>
                  <Image style={styles.Qimage} source={QualityImg}></Image>
                </View>
                <Text style={styles.CardHead}>Quantity</Text>
              </View>
              <View style={styles.cardInHead}>
                <Text style={styles.cardIntext}>Total</Text>
                <View style={styles.textSA}>
                  <Text style={styles.totalCount}>{datas.total_quantity ? datas.total_quantity : 0}</Text>
                  <Text style={styles.textSmall}>Liters</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 15}}>
                <View style={{paddingVertical: 10}}>
                  <Text style={{color: '#9FA6AA', fontSize: 20}}>AM</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      paddingVertical: 5,
                      gap: 5,
                    }}>
                    <Text
                      style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
                      {datas.am_total_quantity ? datas.am_total_quantity : 0}
                    </Text>
                    <Text style={{fontSize: 14, color: '#9FA6AA'}}>Liters</Text>
                  </View>
                </View>
                <View style={{paddingVertical: 10}}>
                  <Text style={{color: '#9FA6AA', fontSize: 20}}>PM</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      paddingVertical: 5,
                      gap: 5,
                    }}>
                    <Text
                      style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
                      {datas.pm_total_quantity ? datas.pm_total_quantity : 0}
                    </Text>
                    <Text style={{fontSize: 14, color: '#9FA6AA'}}>Liters</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.smallCardsect}>
              <View style={styles.smallCard}>
                <View style={styles.HeadDiv}>
                  <View style={styles.iconContainer}>
                    <Image style={styles.Qimage} source={PaintBucket}></Image>
                  </View>
                  <Text style={styles.CardHead}>CLR</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingVertical: 15,
                    gap: 5,
                  }}>
                  <Text
                    style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
                    {datas.average_clr ? datas.average_clr.toFixed(2) : 0}
                  </Text>
                  <Text style={{fontSize: 14, color: '#9FA6AA'}}>Units</Text>
                </View>
              </View>
              <View style={styles.smallCard}>
                <View style={styles.HeadDiv}>
                  <View style={styles.iconContainer}>
                    <Image style={styles.Qimage} source={Ruler}></Image>
                  </View>
                  <Text style={styles.CardHead}>FAT</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingVertical: 15,
                    gap: 5,
                  }}>
                  <Text
                    style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
                    {datas.average_fat ? datas.average_fat.toFixed(2) : 0}
                  </Text>
                  <Text style={{fontSize: 14, color: '#9FA6AA'}}>Units</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Other components and views as necessary */}
          <View style={{gap: 8}}>
            <View style={styles.smallCard2}>
              <View style={styles.HeadDiv}>
                <View style={styles.iconContainer}>
                  <Image style={styles.Qimage} source={Design}></Image>
                </View>
                <Text style={styles.CardHead}>SNF</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  paddingVertical: 15,
                  gap: 5,
                }}>
                <Text style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
                  {datas.average_snf ? datas.average_snf.toFixed(2) : 0}
                </Text>
                <Text style={{fontSize: 14, color: '#9FA6AA'}}>Units</Text>
              </View>
            </View>
            <View style={styles.smallCard3}>
              <View style={styles.HeadDiv}>
                <View style={styles.iconContainer}>
                  <Image style={styles.Qimage} source={MoneyImg}></Image>
                </View>
                <Text style={styles.CardHead}>Todays earnings</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 40,
                    width: '60%',
                    borderRightWidth: 1,
                    borderColor: '#E3F5FF',
                  }}>
                  <View style={{paddingVertical: 10}}>
                    <Text
                      style={{color: '#9FA6AA', fontSize: 16, color: '#000'}}>
                      AM
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingVertical: 5,
                        gap: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        &#x20B9;
                        {datas.am_total_price ? datas.am_total_price : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={{color: '#9FA6AA', fontSize: 16}}>PM</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        paddingVertical: 5,
                        gap: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        &#x20B9;
                        {datas.pm_total_price ? datas.pm_total_price : 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{paddingVertical: 10, paddingLeft: 50}}>
                  <Text style={{color: '#9FA6AA', fontSize: 16}}>Total</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      paddingVertical: 5,
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '400',
                        color: '#73C59D',
                      }}>
                      &#x20B9;{datas.total_price ? datas.total_price : 0}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 10,
    color: '#000',
  },
  container: {
    paddingTop: 0,
    // paddingHorizontal:16,
    // paddingBottom:136,
  },
  cover: {
    paddingTop: 50,
    backgroundColor: '#F3F8F9',
  },
  iconContainer: {
    padding: 3,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF7FA',
  },
  StatusCover: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Qimage: {
    // width:25,
  },
  Card: {
    backgroundColor: '#fff',
    width: '49%',
    padding: 14,
    borderRadius: 8,
    borderColor: '#E3F5FF',
    borderWidth: 1,
  },
  CardHead: {
    fontSize: 18,
    fontWeight: '500',
    fontColor: '#000',
    color: '#000',
  },
  HeadDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardInHead: {
    marginTop: 15,
    paddingBottom: 20,
    borderBottomColor: '#E3F5FF',
    borderBottomWidth: 2,
  },
  cardIntext: {
    color: '#9FA6AA',
    fontSize: 24,
    fontWeight: '300',
  },
  textSA: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  totalCount: {
    fontSize: 28,
    color: '#49BFD4',
  },
  textSmall: {
    fontSize: 17,
    color: '#9FA6AA',
  },
  smallCardsect: {
    width: '49%',
    gap: 10,
  },
  smallCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    borderColor: '#E3F5FF',
    borderWidth: 1,
  },
  smallCard2: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    borderColor: '#E3F5FF',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard3: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    borderColor: '#E3F5FF',
    borderWidth: 1,
  },
  // Add styles for other components if necessary
});
