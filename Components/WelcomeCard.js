import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/logo/logo_white.png'
import MilkImg from '../assets/icons/milk.png'
// import LinearGradient from 'react-native-linear-gradient';

const WelcomeCard = () => {
    const colors = ['#FFD700', '#FF8C00', '#FF0000'];
const locations = [0, 0.5, 1];
  return (
    // <LinearGradient style={styles.cover} start={{ x: 0, y: 0 }}
    // end={{ x: 1, y: 0 }}
    // colors={colors}
    // locations={locations}>
    <View>
      <View style={styles.cover}>
        <Text style={styles.welcomenote}>Welecome to,</Text>
        <View style={styles.left}>
            <Image source={Logo}/>
            <Text style={styles.logo}>Jeeva Milk</Text>
        </View>
        <Image style={styles.abs_image} source={MilkImg}/>
      </View>
    </View>
  )
}

export default WelcomeCard

const styles = StyleSheet.create({
    cover:{
        backgroundColor:'#60CFE2',
        height:115,
        borderRadius:10,
        padding:20,
        position:'relative',
        overflow:'hidden',
        // flexDirection:'row',
        // alignItems:'center',
    },
    welcomenote:{
        color:'#fff',
        fontSize:18
    },
    logo:{
        color:'#fff',
        fontSize:24,
    },
    left:{
        flexDirection:'row',
        gap:5,
        marginTop:5
    },
    abs_image:{
        position:'absolute',
        right:0,
        top: 0,
        // top:-90,
        width:310,
        // height:200,
    }
})