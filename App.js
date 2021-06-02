/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import Login from './src/components/Login';
import RegisterUser from './src/components/RegisterUser';
import Home from './src/components/Home';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const App: ()=> React$Node =()=>{

const Stack = createStackNavigator();


return(
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  );






};

export default App ;
