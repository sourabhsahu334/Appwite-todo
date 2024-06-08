import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../utiles/GlobalStyles';
import theme from '../utiles/theme';
import { getCurrentUser } from '../Services';


const Splash = ({navigation}) => {
  
  
  useEffect(()=>{
  const fetch = async()=>{
    const data = await getCurrentUser();
    console.log(data,"data");
    // if(data?.$id){
        setTimeout(user => {
          if(data?.$id){
            navigation.replace("Home")
          }
          else{
            navigation.replace('Login')
          }
          }, 2500);
    // }
    
  }
  fetch()
  },[])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{height:200,width:200,borderRadius:100,justifyContent:"center",alignItems:"center",backgroundColor:theme.colors.primary}}>
        <Text style={[globalStyles.text,{color:"white",fontSize:35}]}>TODO</Text>
    </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Text: {
    fontSize: 35,
    color: '#fbb238',
    fontWeight: 'bold',
    marginTop: -25,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -40,
  },
});
