import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../utiles/GlobalStyles';
import {RenderIcon} from '../components/RenderIcon';
import theme from '../utiles/theme';
import {CustomButton} from '../components/CustomButton';
import {logout} from '../Services';

const Home = ({navigation}) => {
  const log_out = async () => {
    const data = await logout();
    navigation.replace('Login');
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#db1a5a',
          elevation: 1,
          width: '100%',
          height: 40,
          marginBottom: 10,
        }}>
        <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
          Welcome to the Todo Appwrite
        </Text>
      </View>
      <View style={{padding: 10}}>
        <CustomButton
          onPressfuntion={() => navigation.navigate('Create')}
          text={'Todo List'}
        />
        <CustomButton
          text={'Create team'}
          marginTop={20}
          onPressfuntion={() => navigation.navigate('Teams')}
        />

        <CustomButton
          text={'Send invitation to team'}
          marginTop={20}
          bg={'green'}
        />
        <CustomButton
          onPressfuntion={() => log_out()}
          text={'Log Out'}
          marginTop={20}
          bg={'black'}
        />
      </View>
    </View>
  );
};

export default Home;
