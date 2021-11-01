import { useNavigation } from '@react-navigation/core'
import React,{useState, useEffect} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity} from 'react-native'
import { Value } from 'react-native-reanimated';
import { auth } from '../database/firebase'

import firebase from '../database/firebase'

const CreateUserScreen = (props) =>{

    const [state, setState]= useState ({
        name: "",
        mail: "",
        phone: "",
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleChangeText = (name, value) => {
        setState({...state, [name]:value})
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("HomeScreen")
          }
        })
    
        return unsubscribe
      }, [])

      const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
          })
          .catch(error => alert(error.message))
      }
    
    return (
        <ScrollView StyleSheet={styles.container}>
            <KeyboardAvoidingView
            style={styles.container}
                behavior="padding"
                >
            <View styles={styles.inputContainer}>
                <TextInput 
                placeholder="Email" 
                value={email}
                onChangeText={text => setEmail(text)} 
                style={styles.input}           
                />
            </View>
            <View styles={styles.inputContainer}>
                <TextInput 
                placeholder="Contraseña" 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>
            <View>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Registrarme</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
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

export default CreateUserScreen