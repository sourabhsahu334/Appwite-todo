import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../utiles/GlobalStyles';
import {CustomTextInput} from '../components/Textinput';
import {CustomButton} from '../components/CustomButton';
import {createAccount, loginWithAppwrite} from '../Services';
import theme from '../utiles/theme';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [pagestatus, setPagestatus] = useState(false);
  const navigation = useNavigation();

  const login = async () => {
    let data = '';
    setLoading(true);
    if (pagestatus) {
      data = await loginWithAppwrite(email, password);
    } else {
      data = await createAccount(email, password, name);
    }
    if (data) {
      navigation.navigate('Home');
    }
    console.log(data);
    setLoading(false);
  };

  return (
    <View style={[globalStyles.container2, {justifyContent: 'center'}]}>
      <Text
        style={[globalStyles.text, {textAlign: 'center', marginBottom: 30,backgroundColor:"white",elevation:1,padding:10,borderRadius:30}]}>
        {pagestatus ? 'Login' : 'Sign Up'}
      </Text>
      {!pagestatus && (
        <CustomTextInput
          label={'Name'}
          placeholder={'Name'}
          value={name}
          setValue={setName}
          marginTop={20}
        />
      )}
      <CustomTextInput
        label={'Email'}
        placeholder={'Email'}
        value={email}
        setValue={setEmail}
        marginTop={20}
      />
      <CustomTextInput
        label={'Password'}
        placeholder={'Password'}
        value={password}
        setValue={setPassword}
        marginTop={20}
      />
      <CustomButton
        loading={loading}
        text={pagestatus ? 'Login' : 'Sign Up'}
        onPressfuntion={() => login()}
        marginTop={30}
      />
      <TouchableOpacity onPress={() => setPagestatus(!pagestatus)}>
        {pagestatus ? (
          <Text
            style={[globalStyles.text2, {textAlign: 'center', marginTop: 20}]}>
            Did'nt have an account ?{' '}
            <Text style={{color: theme.colors.primary}}>Sign Up</Text>
          </Text>
        ) : (
          <Text
            style={[globalStyles.text2, {textAlign: 'center', marginTop: 20}]}>
            Already have an account ?{' '}
            <Text style={{color: theme.colors.primary}}>Login</Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
