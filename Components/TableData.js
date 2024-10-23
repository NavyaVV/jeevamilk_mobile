import { View, Text } from 'react-native'
import React from 'react'

const TableData = ({no,name,breed,age,insurance}) => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:8, borderBottomWidth:1,borderColor:'#E3F5FF'}}>
        <Text style={{width:'10%',color:'#4A4D4E',fontSize:14}}>{no}</Text>
        <Text style={{width:'20%',color:'#4A4D4E',fontSize:14}}>{name}</Text>
        <Text style={{width:'20%',color:'#4A4D4E',fontSize:14}}>{breed}</Text>
        <Text style={{width:'10%',color:'#4A4D4E',fontSize:14}}>{age}</Text>
        <Text style={{width:'25%',color:insurance=="Insured"?'#73C59D':"#F26B6B",fontSize:14}}>{insurance}</Text>
    </View>
  )
}

export default TableData