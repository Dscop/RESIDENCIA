import React,{useState} from 'react'
import {View, Button, TextInput, StyleSheet, BackHandler, Text, TouchableOpacity, StatusBar, Image, ScrollView} from 'react-native'
import { loginStyles } from "../styles/styles";
import MyTextInput from "../components/MyTextInput";
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
                <Text style={loginStyles.btntxt} onPress={() => props.navigation.navigate("LoginScreen")}>Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
            <TouchableOpacity>
                <Text style={[loginStyles.btntxt, {color: color.pink}]} onPress={() => props.navigation.navigate("CreateUserScreen")}>Registrarme</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity>
                <Text style={[loginStyles.txtTransparent, {textDecorationLine: 'underline'}]} onPress={() => props.navigation.navigate("PrincipalScreen")}>En otro momento</Text>
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