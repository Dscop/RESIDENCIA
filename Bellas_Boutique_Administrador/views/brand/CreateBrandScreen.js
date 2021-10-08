import React,{useState} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { Value } from 'react-native-reanimated';
import firebase from '../../database/firebase'

const CreateBrandScreen = (props) => {
    const [state, setState]= useState ({
        nombre: ""
    });

    const handleChangeText = (nombre, value) => {
        setState({...state, [nombre]:value})
    }

    const saveNewBrand = async () => {
        if(state.nombre===''){
            alert('No dejar campos vacios')
        }else{
            await firebase.conexion.collection('marcas') .add({
                nombre: state.nombre
            })
            props.navigation.navigate('BrandsList');
        }
    }

    return (
        <ScrollView StyleSheet={styles.container}>
            <View styles={styles.inputGroup}>
                <Text>Nombre de la Marca</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View>
                <Button title="Guardar"
                onPress={()=> saveNewBrand()}
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
export default CreateBrandScreen;