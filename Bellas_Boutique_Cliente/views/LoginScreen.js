import React, {Component, useState, useEffect} from "react";
import { 
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
 } from 'react-native';
 import { loginStyles } from "../styles/styles";
 import MyTextInput from "../components/MyTextInput";
 import color from '../styles/colors';

export default function LoginScreen(props){
    const [hidePassword, setHidePassword] = useState(false)
        return(
            <ScrollView>
            <View style={[loginStyles.container, {padding:50}]}>
                <StatusBar backgroundColor={color.pink} translucent={true}/>
                <View style={loginStyles.logo}>
                    <Image source={require('../images/logo2.jpg')}
                    style={{height:250, width:250}}/>
                </View>
                <MyTextInput keyboardType='email-address' placeholder='E-mail' image='user'/>
                <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true}
                secureTextEntry={hidePassword}
                onPress={()=> setHidePassword(!hidePassword)}/>
                <View style={loginStyles.btnMain}>
                    <TouchableOpacity>
                        <Text style={loginStyles.btntxt}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.btnTransparent}>
                    <TouchableOpacity>
                        <Text style={[loginStyles.btntxt, {color: color.pink}]}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={[loginStyles.txtTransparent, {textDecorationLine: 'underline'}]}>Olvide mi Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    }