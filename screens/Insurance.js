import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CowIcon from '../assets/images/cow.png';
import TableData from '../Components/TableData';
import {cowsList} from '../api/auth';
import Header from './Header';

const Insurance = () => {
  const [cowData, setCowData] = useState({});
  const [refresh, setRefresh] = useState(false);
  console.log(cowData);
  useEffect(() => {
    cowsList().then(res => {
      if (res.data.app_data.StatusCode === 6000) {
        setCowData(res.data?.app_data.data);
      }
      setRefresh(false);
    });
  }, [refresh]);
  console.log(cowData);
  return (
    <>
      <Header />
      <ScrollView
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: '#F3F8F9',
        }}>
        <View style={styles.topCover}>
          <View style={styles.headCover}>
            <View style={styles.imageContainer}>
              <Image source={CowIcon} />
            </View>
            <Text style={{color: '#6E7475', fontWeight: 600, fontSize: 16}}>
              Count
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.cardData}>
              <View>
                <Text
                  style={{color: '#878787', fontSize: 14, paddingBottom: 7}}>
                  Total
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
                <Text
                  style={{color: '#49BFD4', fontSize: 22, fontWeight: '600'}}>
                  {cowData?.cows_count ? cowData?.cows_count : cowData.length}
                </Text>
                <Text style={{color: '#878787', fontSize: 16}}>cows</Text>
              </View>
            </View>
            <View style={styles.cardData}>
              <View>
                <Text
                  style={{color: '#878787', fontSize: 14, paddingBottom: 7}}>
                  Insured cows
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
                <Text
                  style={{color: '#4A4D4E', fontSize: 22, fontWeight: '600'}}>
                  {cowData?.insured_cow_count ? cowData.insured_cow_count : 0}
                </Text>
                <Text style={{color: '#878787', fontSize: 16}}>cows</Text>
              </View>
            </View>
            <View style={styles.cardData}>
              <View>
                <Text
                  style={{color: '#878787', fontSize: 14, paddingBottom: 7}}>
                  Uninsured cows
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
                <Text
                  style={{color: '#4A4D4E', fontSize: 22, fontWeight: '600'}}>
                  {/* {cowData?.uninsured_count ? cowData?.uninsured_count : 0} */}
                  {cowData?.uninsured_count ? cowData.uninsured_count : 0}
                </Text>
                <Text style={{color: '#878787', fontSize: 16}}>cows</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.topCover}>
          <View style={styles.headCover}>
            <View style={styles.imageContainer}>
              <Image source={CowIcon} />
            </View>
            <Text style={{color: '#6E7475', fontWeight: '600', fontSize: 16}}>
              Details
            </Text>
          </View>
          <View style={styles.dataHead}>
            <Text style={{width: '10%', color: '#9FA6AA'}}>No</Text>
            <Text style={{width: '20%', color: '#9FA6AA'}}>Name</Text>
            <Text style={{width: '20%', color: '#9FA6AA'}}>Breed</Text>
            <Text style={{width: '10%', color: '#9FA6AA'}}>Age</Text>
            <Text style={{width: '25%', color: '#9FA6AA'}}>Insurance</Text>
          </View>
          <FlatList
            data={cowData}
            renderItem={({item, index}) => (
              <TableData
                no={index + 1}
                name={item.name}
                breed={item.breed}
                age="02"
                insurance={item.insured ? 'Insured' : 'Uninsured'}
                key={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(!refresh);
              // Add your refresh logic here
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 8,
    backgroundColor: '#EAF7FA',
    borderRadius: 6,
  },
  headCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topCover: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3F5FF',
  },
  cardData: {},
  dataHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
