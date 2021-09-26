import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import ProductList from './views/ProductList';
import ProductDetailScreen from './views/ProductDetailScreen';
import CreateProductScreen from './views/CreateProductScreen';


const Stack =createStackNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name= "ProductList" component ={ProductList} options={{title: 'Lista de articulos'}} />
      <Stack.Screen name= "ProductDetailScreen" component ={ProductDetailScreen} options={{title: 'Detalle del articulo'}} />
      <Stack.Screen name= "CreateProductScreen" component ={CreateProductScreen} options={{title: 'Insertar nuevo articulo'}} />      
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