import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string,
    showCancel?:boolean, 
}

export default  function  Header({title, showCancel = true}: HeaderProps){
    const navigation = useNavigation();

    function handleGoBackMainPage(){
        navigation.navigate("OrphanagesMap")
    }
    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name='arrow-left' size={24} color="#15b6d6" />
            </BorderlessButton>
            <Text style={styles.title}>
                {title}
            </Text>
            {
                showCancel ? (
                    <BorderlessButton onPress={handleGoBackMainPage}>
                        <Feather name='x' size={24} color="#ff669d" />
                    </BorderlessButton>
                ) :
                (
                    <View />
                )
            }
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:24,
        backgroundColor:"#f9fafc",
        borderBottomWidth:1,
        borderColor:"#dde3f0",
        paddingTop:44,

        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center"
    },
    title:{
        fontFamily:"Nunito_600SemiBold",
        color:"#8fa7b3",
        fontSize:16
    },
    createOrphanageButton:{
        width:56,
        height:56,
        backgroundColor:"#15c3d6",
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
      }
    
});
