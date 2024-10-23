import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ValueCard = ({label,value,icon}) => {
  return (
    <View style={styles.container}>
        <View style={styles.headCover}>
                <View style={styles.imageContainer}>
                    <Image source={icon}/>
                </View>
            <Text style={{color:'#000'}}>{label}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}>
            <Text style={styles.ValueText}>{value}</Text>
            <Text style={{color:'#878787'}}>units</Text>
        </View>
    </View>
  )
}

export default ValueCard

const styles = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8,
        borderWidth:1,
        borderColor:'#E3F5FF'
    },
    headCover:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    imageContainer:{
        padding:8,
        backgroundColor:'#EAF7FA',
        borderRadius:6
    },
    ValueText:{
        fontSize:26,
        color:'#000'
    }
})