import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import CreateUserScreen from './views/CreateUserScreen';
import PrincipalScreen from './views/PrincipalScreen';
import DetailScreen from './views/DetailScreen';
import COLORS from './styles/colors';
import CartScreen from './views/CartScreen';

const Stack =createStackNavigator()
const Drawer = createDrawerNavigator();

function Header(){
  return(
    <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Pantalla de inicio" component={HomeScreen} />
        <Drawer.Screen name="Pantalla principal" component={PrincipalScreen} />
        <Drawer.Screen name="Carrito" component ={CartScreen}/>
      </Drawer.Navigator>
  )
}

function MyStack(){
  return(
    <Stack.Navigator /*screenOptions={{header: () => null}}*/>
      <Stack.Screen
          name="Inicio"
          component={Header}
          options={{ headerShown: false }}
        />
      <Stack.Screen name= "HomeScreen" component ={HomeScreen} options={{title: 'Pantalla de inicio'}} />
      <Stack.Screen name= "LoginScreen" component ={LoginScreen} options={{title: 'inicio de sesion'}} />
      <Stack.Screen name= "CreateUserScreen" component= {CreateUserScreen} options={{title: 'Creacion de cuenta'}}/>
      <Stack.Screen name= "PrincipalScreen" component= {PrincipalScreen} options={{title: 'Pantalla principal'}}/>
      <Stack.Screen name= "DetailScreen" component= {DetailScreen} options={{title: 'Detalle del producto'}}/>
      <Stack.Screen name= "CartScreen" component= {CartScreen} options={{title: 'Carrito'}}/>
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <MyStack />
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