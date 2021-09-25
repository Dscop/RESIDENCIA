import React,{useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import { Value } from 'react-native-reanimated';
//import firebase from '../Database/firebase'

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
                <TextInput placeholder="Nombre del articulo" 
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Descripcion del articulo" 
                onChangeText = {(Value) => handleChangeText('descripcion', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Categoria del articulo" 
                onChangeText = {(Value) => handleChangeText('categoria', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Precio del articulo" 
                onChangeText = {(Value) => handleChangeText('precio', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Color del articulo" 
                onChangeText = {(Value) => handleChangeText('color', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Inventario del articulo" 
                onChangeText = {(Value) => handleChangeText('inventario', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Talla del articulo" 
                onChangeText = {(Value) => handleChangeText('talla', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Marca del articulo" 
                onChangeText = {(Value) => handleChangeText('marca', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <TextInput placeholder="Estado del articulo" 
                onChangeText = {(Value) => handleChangeText('estado', Value )}            
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

export default CreateProductScreen