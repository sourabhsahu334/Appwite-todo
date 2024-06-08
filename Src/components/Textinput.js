import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { globalStyles } from '../utiles/GlobalStyles';
import theme from '../utiles/theme';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontist from 'react-native-vector-icons/Fontisto.js';

export const CustomTextInput = ({
  label,
  value,
  setValue,
  placeholder,
  labelStatus,
  marginTop,
  numeric,
  secure,
  iconName,
  visible,
  setVisible,
}) => {
  const [focus, setFoucs] = useState(false);
  return (
    <View
      style={{
        flexDirection: labelStatus ? 'column' : 'row',
        alignItems: 'center',
        marginTop: marginTop,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: focus ? theme.colors.primary : theme.colors.primaryOpacity,
        backgroundColor: 'white',
        paddingHorizontal: 5,
      }}>
      {/* <View style={{height:30,width:30,justifyContent:"center",alignItems:"center",borderRadius:7,backgroundColor:theme.colors.primaryOpacity}}>
    <MaterialCommunityIcons name={iconName} size={20} color={theme.colors.primary}/>

    </View> */}
      {labelStatus && (
        <Text
          style={{
            marginRight: 'auto',
            marginLeft: 20,
            marginTop: -12,
            backgroundColor: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          onFocus={() => setFoucs(true)}
          onBlur={() => setFoucs(false)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'black'}
          onChangeText={e => setValue(e)}
          keyboardType={numeric}
          secureTextEntry={visible}
          style={{
            width: '90%',
            borderRadius: 15,
            backgroundColor: theme.colors.white,
            //   elevation: 2,
            // height: 50,
            justifyContent: 'center',

            color: 'black',
          }}
        />
        {secure && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Ionicons
              name={!visible ? 'eye-off-sharp' : 'eye'}
              size={20}
              color="black"
              style={{marginLeft: -30}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
