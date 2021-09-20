import React,{useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { Value } from 'react-native-reanimated';
//import firebase from '../Database/firebase'

const CreateUserScreen = (props) =>{

    const [state, setState]= useState ({
        name: "",
        mail: "",
        phone: "",
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]:value})
    }

    const saveNewUser= async () => {
        if(state.name==='' || state.mail==='' || state.phone===''){
            alert ('Introduce un valor')
        }else{
            await firebase.conexion.collection('users') .add({
                name: state.name,
                mail: state.mail,
                phone: state.phone,
            
            })
            //alert('Guardado exitosamente')
            //props.navigation.navigate('UserDetailScreen');
            props.navigation.navigate('UsersList');
        }

    }

    const AddNewUser = async () => {
        if(state.name=== ''){
            alert ("Introduce un valor")
        }else{
            alert (state.name)
            console.log(state)
        }
    }
    
    return (
        <ScrollView StyleSheet={styles.container}>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Nombre" 
                onChangeText = {(Value) => handleChangeText('name', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Correo" 
                onChangeText = {(Value) => handleChangeText('mail', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Telefono" 
                onChangeText = {(Value) => handleChangeText('phone', Value )}            
                />
            </View>
            <View>
                <Button title="Guardar"
                onPress = {()=> AddNewUser()}
                //onPress={()=> saveNewUser()}
                />
            </View>
        </ScrollView>
    )
}

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

export default CreateUserScreen