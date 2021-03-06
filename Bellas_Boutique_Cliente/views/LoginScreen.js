import React, {useState, useEffect} from "react";
import { 
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
 } from 'react-native';
import { loginStyles } from "../styles/styles";
import MyTextInput from "../components/MyTextInput";
import color from '../styles/colors';

import { useNavigation } from '@react-navigation/core'

import { auth } from '../database/firebase'

 const LoginScreen = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const [hidePassword, setHidePassword] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("PrincipalScreen")
          }
        })
    
        return unsubscribe
      }, [])

      const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
          })
          .catch(error => alert(error.message))
      }

        return(
            <ScrollView>
                <KeyboardAvoidingView
                behavior="padding"
                >
            <View style={[loginStyles.container, {padding:50}]}>
                <StatusBar backgroundColor={color.pink} translucent={true}/>

                <View style={loginStyles.logo}>
                    <Image source={require('../images/logo2.jpg')}
                    style={{height:250, width:250}}/>
                </View>
                <MyTextInput keyboardType='email-address' placeholder='Email' image='user' 
                value={email} onChangeText={text => setEmail(text)} />

                <MyTextInput keyboardType={null} placeholder='Contraseña' image='lock' bolGone={true}
                secureTextEntry={hidePassword}
                onPress={()=> setHidePassword(!hidePassword)}
                value={password}
                onChangeText={text => setPassword(text)}
                />

                <View style={loginStyles.btnMain}>
                    <TouchableOpacity
                    onPress={handleLogin}>
                        <Text style={loginStyles.btntxt}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <TouchableOpacity>
                        <Text style={[loginStyles.txtTransparent, {textDecorationLine: 'underline'}]}>Olvide mi Contraseña</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
    export default LoginScreen
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        inputContainer: {
          width: '80%'
        },
        input: {
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 5,
        },
        buttonContainer: {
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        },
        button: {
          backgroundColor: '#0782F9',
          width: '100%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        },
        buttonOutline: {
          backgroundColor: 'white',
          marginTop: 5,
          borderColor: '#0782F9',
          borderWidth: 2,
        },
        buttonText: {
          color: 'white',
          fontWeight: '700',
          fontSize: 16,
        },
        buttonOutlineText: {
          color: '#0782F9',
          fontWeight: '700',
          fontSize: 16,
        },
      })