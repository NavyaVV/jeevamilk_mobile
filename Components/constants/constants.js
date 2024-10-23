import { StyleSheet } from "react-native";


const COLORS = {
    body_bg : '#F3F8F9',
    text_color : "#181818",
    text_muted_color : '#747474',
    icon_bg_color : '#EAF7FA',
    button_bg : '#49BFD4'
}

const FONTS= {
    
}
const globalStyles = StyleSheet.create({
    card:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#E3F5FF',
        borderRadius:10,
        padding:16,
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginBottom:5
    }
})

export { COLORS ,globalStyles};