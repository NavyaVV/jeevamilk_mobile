import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {formattedDate, getAMorPM, roundTo} from '../helper';

const MilkCard = datas => {
  console.log(datas, '______datas_____');
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.date}>
          {formattedDate(datas?.datas.created_at)}
        </Text>
        <Text style={styles.status}>Closed</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomTop}>
          <Text style={styles.Heading}>Total Milk Status</Text>
          <Text style={styles.span}>{getAMorPM(datas?.datas.created_at)}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailsTop}>
          <Text style={{color: '#000'}}>milk(L): </Text>
          <Text style={{color: '#000', fontSize: 20}}>
            {roundTo(datas?.datas.quantity, 2)}
          </Text>
          <Text style={{color: '#000'}}>Liters</Text>
        </View>
        <View style={styles.detailsTop}>
          <Text style={{color: '#000'}}>Amount: </Text>
          <Text style={{color: '#000'}}>
            ₹{roundTo(datas?.datas.total_price, 2)}
          </Text>
          {/* <Text style={{color:'#000'}}>milk(L): </Text> */}
        </View>
      </View>
      <View style={styles.detailsBottom}>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: '#000'}}>Fat</Text>
            <Text style={{color: '#000'}}>{datas?.datas.fat_value}</Text>
          </View>
          <View>
            <Text style={{color: '#000'}}>Clr</Text>
            <Text style={{color: '#000'}}>{datas?.datas.clr_value}</Text>
          </View>
          <View>
            <Text style={{color: '#000'}}>Snf</Text>
            <Text style={{color: '#000'}}>{datas?.datas.snf_value}</Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#000'}}>Damaged Milk</Text>
          <Text style={{color: '#000'}}>{datas?.datas.damaged ? datas?.datas.damaged : 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default MilkCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3F5FF',
    marginBottom: 15,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E3F5FF',
    paddingVertical: 10,
  },
  date: {
    fontSize: 18,
    color: '#000',
  },
  status: {
    fontSize: 20,
    color: 'green',
  },
  bottom: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  bottomTop: {
    flexDirection: 'row',
    gap: 5,
  },
  Heading: {
    color: '#49BFD4',
    fontSize: 18,
  },
  span: {
    backgroundColor: '#73C59D',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    color: '#fff',
  },
  details: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsTop: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
  },
  detailsBottom: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
