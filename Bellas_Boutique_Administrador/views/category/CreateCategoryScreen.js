import React,{useState} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { Value } from 'react-native-reanimated';
import firebase from '../../database/firebase'

const CreateCategoryScreen = (props) => {
    const [state, setState]= useState ({
        nombre: ""
    });

    const handleChangeText = (nombre, value) => {
        setState({...state, [nombre]:value})
    }

    const saveNewCategory = async () => {
        if(state.nombre===''){
            alert('No dejar campos vacios')
        }else{
            await firebase.conexion.collection('categorias') .add({
                nombre: state.nombre
            })
            props.navigation.navigate('CategoryList');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Nombre de la Categoria</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View>
                <Button title="Guardar"
                onPress={()=> saveNewCategory()}
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
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        justifyContent: 'center',
    },
})

export default CreateCategoryScreen;