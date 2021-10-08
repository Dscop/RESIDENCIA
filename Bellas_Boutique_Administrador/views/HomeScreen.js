import React,{useState} from 'react'
import {View, Button, TextInput, StyleSheet, BackHandler, Text, TouchableOpacity, StatusBar, Image, ScrollView} from 'react-native'
import { loginStyles } from "../styles/styles";
import color from '../styles/colors';

const HomeScreen = (props) => {

    return(
        <ScrollView StyleSheet={styles.container}>
        <View style={[loginStyles.container, {padding:50}]}>
        <StatusBar backgroundColor={color.pink} translucent={true}/>
        <View style={loginStyles.logo}>
            <Image source={require('../images/logo.jpg')}
            style={{height:250, width:250}}/>
        </View>
        <View style={loginStyles.btnMain}>
            <TouchableOpacity>
                <Text style={loginStyles.btntxt} onPress={() => props.navigation.navigate("ProductList")}>Lista de Articulos</Text>
            </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
            <TouchableOpacity>
                <Text style={[loginStyles.btntxt, {color: color.pink}]} onPress={() => props.navigation.navigate("BrandsList")}>Lista de Marcas</Text>
            </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
            <TouchableOpacity>
                <Text style={[loginStyles.btntxt, {color: color.pink}]} onPress={() => props.navigation.navigate("CategoryList")}>Lista de Categorias</Text>
            </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    );
};

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
})

export default HomeScreen;