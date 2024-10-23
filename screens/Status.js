// import * as React from 'react'
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import GraphIcon from '../assets/images/Business.png';
import ValueCard from '../Components/ValueCard';
import PaintBucket from '../assets/images/paintbucket.png';
import {useEffect, useState} from 'react';
import {farmerQuality, graphDatas} from '../api/auth';
import Header from './Header';
// import { ScrollView } from 'react-native-gesture-handler';

export default function Status({navigation}) {
  const [graphNumbers, setGraphNumbers] = useState({});
  const [averages, setAverages] = useState({});
  useEffect(() => {
    graphDatas().then(res => {
      setGraphNumbers(res.data.app_data.data);
    });
    farmerQuality().then(res => {
      setAverages(res.data.app_data.data);
    });
  }, []);
  console.log(averages);
  console.log(graphNumbers.label_data, graphNumbers.data, '---=-');
  const data = {
    labels: graphNumbers.label_data || [],
    datasets: [
      {
        data: graphNumbers.data || [],
      },
    ],
  };
  const windowWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#ffff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#56C9DC`,
    strokeWidth: 0.1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <>
      <Header />
      <ScrollView style={{backgroundColor: '#F3F8F9', paddingHorizontal: 16}}>
        <View style={{paddingVertical: 15}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#000',
            }}>
            Quality Status
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.headCover}>
            <View style={styles.imageContainer}>
              <Image source={GraphIcon} />
            </View>
            <Text>Graph</Text>
          </View>
          <View style={{padding: 8}}>
            <BarChart
              data={data}
              width={windowWidth - 55}
              height={250}
              yAxisLabel=""
              chartConfig={chartConfig}
              // verticalLabelRotation={30}
            />
          </View>
        </View>
        <ValueCard
          label="Average CLR"
          value={averages?.avg_total_clr_value?.toFixed(2)}
          icon={PaintBucket}
        />
        <ValueCard
          label="Average FAT"
          value={averages?.avg_total_fat_value?.toFixed(2)}
          icon={PaintBucket}
        />
        <ValueCard
          label="Average SNF"
          value={averages?.avg_total_snf_value?.toFixed(2)}
          icon={PaintBucket}
        />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E3F5FF',
  },
  headCover: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  imageContainer: {
    padding: 8,
    backgroundColor: '#EAF7FA',
    borderRadius: 6,
  },
});
