import React,{useState} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { Value } from 'react-native-reanimated';
import firebase from '../database/firebase'

const CreateProductScreen = (props) => {

    const [state, setState]= useState ({
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        color: "",
        inventario: "",
        talla: "",
        marca: "",
        estado: ""
    });

    const handleChangeText = (nombre, value) => {
        setState({...state, [nombre]:value})
    }

    const saveNewProduct = async () => {
        if(state.nombre==='' || state.descripcion==='' || state.categoria==='' || state.precio==='' || state.color==='' || state.inventario==='' || state.talla==='' || state.marca==='' || state.estado===''){
            alert('No dejar campos vacios')
        }else{
            await firebase.conexion.collection('productos') .add({
                nombre: state.nombre,
                descripcion: state.descripcion,
                categoria: state.categoria,
                precio: state.precio,
                color: state.color,
                inventario: state.inventario,
                talla: state.talla,
                marca: state.marca,
                estado: state.estado
            })
            props.navigation.navigate('ProductList');
        }
    }
    const AddNewUser = async () => {
        if(state.nombre=== ''){
            alert ("Introduce un valor")
        }else{
            alert (state.nombre)
            console.log(state)
        }
    }

    return (
        <ScrollView StyleSheet={styles.container}>
            <View styles={styles.inputGroup}>
                <Text>Nombre del articulo</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Descricion del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('descripcion', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Categoria del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('categoria', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Precio del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('precio', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Color del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('color', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Inventario del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('inventario', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Talla del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('talla', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Marca del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('marca', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Estado del articulo"</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('estado', Value )}            
                />
            </View>
            <View>
                <Button title="Guardar"
                //onPress = {()=> AddNewUser()}
                onPress={()=> saveNewProduct()}
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

export default CreateProductScreen