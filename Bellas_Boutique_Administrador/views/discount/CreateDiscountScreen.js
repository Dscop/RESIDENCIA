import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Picker, Alert} from 'react-native'
import { Value } from 'react-native-reanimated';
import firebase from '../../database/firebase'

const CreateDiscountScreen = (props) => {

    const [productoD, setProductoD]= useState ({
        id: "",
        nombre: "",
        precio: ""
    });

    const [state, setState]= useState ({
        descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    const handleChangeText = (descuento, value) => {
        setState({...state, [descuento]:value})
        setProductoD({...productoD, [descuento]:value})
    }

    const getProductoById= async (Id) => {
        try {
          const productos = [];
          await firebase.conexion
          .collection('productos') 
          .doc(Id)
          .get()
          .then((documentSnapshot) => {
            if(documentSnapshot.exists ) {
                setProductoD ({...productoD,
                id: Id,
                nombre: documentSnapshot.data().nombre,
                precio: documentSnapshot.data().precio
                });
            }
         })
        } catch (e) {
            alert(e);
          }
      };

   useEffect(() => {
        getProductoById(props.route.params.productoId);
    }, []);

    const saveNewDiscount = async () => {
        if(state.descuento==='' || state.fecha_inicio==='' || state.fecha_fin===''){
            alert('No dejar campos vacios')
        }else{
            await firebase.conexion.collection('descuentos') .add({
                id: productoD.id,
                nombre: productoD.nombre,
                precio: productoD.precio,
                descuento: state.descuento,
                fecha_inicio: state.fecha_inicio,
                fecha_fin: state.fecha_fin
            })
            props.navigation.navigate('ProductList');
        }
    }

    return (
        <ScrollView StyleSheet={styles.container}>
            <View styles={styles.inputGroup}>
                <Text>Id del articulo:</Text>
                <TextInput placeholder=""
                value = {productoD.id} 
                onChangeText = {(Value) => handleChangeText('id', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Nombre del articulo:</Text>
                <TextInput placeholder="" 
                value = {productoD.nombre}
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Precio:</Text>
                <TextInput placeholder="" 
                value = {productoD.precio}
                onChangeText = {(Value) => handleChangeText('precio', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Porcentaje de descuento:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('descuento', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Fecha de inicio:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('fecha_inicio', Value )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Fecha de fin:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('fecha_fin', Value )}            
                />
            </View>
            <View>
                <Button title="Guardar"
                onPress={()=> saveNewDiscount(props.route.params.productoId)}
                />
            </View>
        </ScrollView>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignItems: "center",
        justifyContent: 'center',
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        alignItems: "center",
        justifyContent: 'center',
    },
})

export default CreateDiscountScreen