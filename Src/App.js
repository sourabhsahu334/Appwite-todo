import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './Screeens/Login';
import Splash from './Screeens/Splash';
import Home from './Screeens/Home';
import CreateTodo from './Screeens/CreateTodo';
import Userlist from './Screeens/Userlist';

const Stack = createStackNavigator();


const App = () => {
  
  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown:false}} name="Create" component={CreateTodo} />
        <Stack.Screen options={{headerShown:false}} name="Teams" component={Userlist} />


        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />



        </Stack.Navigator>

      </NavigationContainer>
  )
}

export default App