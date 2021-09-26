import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import CreateUserScreen from './views/CreateUserScreen';

const Stack =createStackNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name= "HomeScreen" component ={HomeScreen} options={{title: 'Pantalla de inicio'}} />
      <Stack.Screen name= "LoginScreen" component ={LoginScreen} options={{title: 'inicio de sesion'}} />
      <Stack.Screen name= "CreateUserScreen" component= {CreateUserScreen} options={{title: 'Creacion de cuenta'}}/>
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;