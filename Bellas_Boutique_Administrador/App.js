import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './views/HomeScreen';

import ProductList from './views/product/ProductList';
import ProductDetailScreen from './views/product/ProductDetailScreen';
import CreateProductScreen from './views/product/CreateProductScreen';

import BrandsList from './views/brand/BrandsList';
import BrandDetailScreen from './views/brand/BrandDetailScreen'
import CreateBrandScreen from './views/brand/CreateBrandScreen';


import CategoryList from './views/category/CategoryList';
import CategoryDetailScreen from './views/category/CategoryDetailScreen';
import CreateCategoryScreen from './views/category/CreateCategoryScreen';

import DiscountList from './views/discount/DiscountList';
import DiscountDetailScreen from './views/discount/DiscountDetailScreen';
import CreateDiscountScreen from './views/discount/CreateDiscountScreen';

import EventScreen from './views/EventScreen';
import COLORS from './styles/colors';

const Stack =createStackNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      
      <Stack.Screen name= "HomeScreen" component ={HomeScreen} options={{title: 'Pantalla de inicio'}} />

      <Stack.Screen name= "ProductList" component ={ProductList} options={{title: 'Lista de articulos'}} />
      <Stack.Screen name= "ProductDetailScreen" component ={ProductDetailScreen} options={{title: 'Detalle del articulo'}} />
      <Stack.Screen name= "CreateProductScreen" component ={CreateProductScreen} options={{title: 'Insertar nuevo articulo'}} />
      
      <Stack.Screen name= "BrandsList" component ={BrandsList} options={{title: 'Lista de marcas'}} />
      <Stack.Screen name= "BrandDetailScreen" component ={BrandDetailScreen} options={{title: 'Detalle de la marca'}} />
      <Stack.Screen name= "CreateBrandScreen" component ={CreateBrandScreen} options={{title: 'Insertar nueva marca'}} />

      <Stack.Screen name= "CategoryList" component ={CategoryList} options={{title: 'Lista de categorias'}} />
      <Stack.Screen name= "CategoryDetailScreen" component ={CategoryDetailScreen} options={{title: 'Detalle de la categoria'}} />
      <Stack.Screen name= "CreateCategoryScreen" component ={CreateCategoryScreen} options={{title: 'Insertar nueva categoria'}} />

      <Stack.Screen name= "CreateDiscountScreen" component ={CreateDiscountScreen} options={{title: 'Insertar nuevo descuento'}} />
      <Stack.Screen name= "DiscountList" component ={DiscountList} options={{title: 'Lista de descuentos'}} />
      <Stack.Screen name= "DiscountDetailScreen" component ={DiscountDetailScreen} options={{title: 'Detalle de descuento'}} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
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