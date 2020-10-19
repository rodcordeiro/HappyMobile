import React, { useState } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/mapMarker.png';
import api from '../services/api';

interface Orphanage{
  id:number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
    const navigation = useNavigation()
    const [orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    useFocusEffect(()=>{
      api.get('orphanages')
        .then(response=>{
          setOrphanages(response.data)}
        )
        .catch(error=>{
          console.log(error)
        })
    })
    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', { id })
    }
    
    
    
    return (
        <View style={styles.container}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude:-23.5440109,
              longitude:-46.6445682,
              latitudeDelta:0.008,
              longitudeDelta:0.008,
            }}
          > 
            {
              orphanages.map(orphanage=>(
                <Marker 
                    key={orphanage.id}
                    icon={mapMarker}
                    calloutAnchor={{
                      x:2.7,
                      y:0.8
                    }}
                    coordinate={{
                      latitude:orphanage.latitude,
                      longitude:orphanage.longitude,
                      }}
                >
                  <Callout tooltip onPress={()=> handleNavigateToOrphanageDetails(orphanage.id)}>
                    <View style={styles.callOutContainer}>
                      <Text style={styles.callOutText}>
                        {orphanage.name}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              ))
            }
          </MapView>
    
          <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {orphanages.length} Orfanatos encontrados
                </Text>
                <RectButton style={styles.createOrphanageButton} onPress={()=>navigation.navigate('SelectMapPosition')}>
                  <Feather name="plus" size={20} color="#fff" />              
                </RectButton>
                
          </View>
        </View>
      );
    
} 
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
    callOutContainer:{
      width:160,
      height:46,
      paddingHorizontal:16,
      backgroundColor:"rgba(255,255,255,0.8)",
      borderRadius:16,
      justifyContent:"center",
      
      elevation:5,
    },
    callOutText:{
      color:"#0089a5",
      fontSize:14,
      fontFamily: "Nunito_700Bold"
    },
    footer:{
      position:'absolute',
      left:24,
      right:24,
      bottom:32,
  
      backgroundColor:"#FFF",
      borderRadius:20,
      height:56,
      paddingLeft:24,
  
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
  
      elevation:5,
    },
    footerText:{
      color:"#8fa7b3",
      fontFamily: "Nunito_700Bold",
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
  