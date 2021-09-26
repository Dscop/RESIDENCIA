import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import firebase from '../database/firebase'

const ProductDetailScreen = (props) => {

    const [producto, setProducto]= useState ({
        id: "",
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

    const handleChangeText = (nombre, x) => {
        setProducto({...producto, [nombre]:x})
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
                setProducto ({...producto,
                id: documentSnapshot.data().id,
                nombre: documentSnapshot.data().nombre,
                descripcion: documentSnapshot.data().descripcion,
                categoria: documentSnapshot.data().categoria,
                precio: documentSnapshot.data().precio,
                color: documentSnapshot.data().color,
                inventario: documentSnapshot.data().inventario,
                talla: documentSnapshot.data().talla,
                marca: documentSnapshot.data().marca,
                estado: documentSnapshot.data().estado,
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

      const updateProducto = async (prod) => {
        try {
          const productos = [];
          await firebase.conexion
          .collection('productos') 
          .doc(prod)
          .update({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            precio: producto.precio,
            color: producto.color,
            inventario: producto.inventario,
            talla: producto.talla,
            marca: producto.marca,
            estado: producto.estado  
          })
          .then(() => {
                console.log('Product updated!');
            });
          } catch (e) {
            alert(e);
          }
          props.navigation.navigate('ProductList');
      };

      const deleteProducto = async (prod) => {
        try {
          const productos = [];
          await firebase.conexion
          .collection('productos') 
          .doc(prod)
          .delete()
          .then(() => {
            props.navigation.navigate('ProductList');
            });
          } catch (e) {
            alert(e);
          }
        };

        const confirmarEliminacion=()=> {
            Alert.alert('Eliminando articulo', '¿Está seguro que desea eliminar?', 
            [ {text: 'Si', onPress:() => deleteProducto(props.route.params.productoId)},
              {text: 'No', onPress:() => alert("Cancelado")}  
            ])
            
        }

    return (
        <ScrollView StyleSheet={styles.container}>
            <View styles={styles.inputGroup}>
                <Text>Nombre del articulo</Text>
                <TextInput placeholder=""
                value = {producto.nombre} 
                onChangeText = {(x) => handleChangeText('nombre', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Descricion del articulo"</Text>
                <TextInput placeholder=""
                value = {producto.descripcion} 
                onChangeText = {(x) => handleChangeText('descripcion', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Categoria del articulo"</Text>
                <TextInput placeholder="" 
                value = {producto.categoria}
                onChangeText = {(x) => handleChangeText('categoria', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Precio del articulo"</Text>
                <TextInput placeholder=""
                value = {producto.precio} 
                onChangeText = {(x) => handleChangeText('precio', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Color del articulo"</Text>
                <TextInput placeholder="" 
                value = {producto.color}
                onChangeText = {(x) => handleChangeText('color', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Inventario del articulo"</Text>
                <TextInput placeholder=""
                value = {producto.inventario} 
                onChangeText = {(x) => handleChangeText('inventario', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Talla del articulo"</Text>
                <TextInput placeholder=""
                value = {producto.talla} 
                onChangeText = {(x) => handleChangeText('talla', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Marca del articulo"</Text>
                <TextInput placeholder="" 
                value = {producto.marca}
                onChangeText = {(x) => handleChangeText('marca', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>"Estado del articulo"</Text>
                <TextInput placeholder="" 
                value = {producto.estado}
                onChangeText = {(x) => handleChangeText('estado', x )}            
                />
            </View>
            <View>
                <Button title="Actualizar"
                color="#348D68"
                onPress= {()=> updateProducto(props.route.params.productoId)}
                />
                <Button title="Eliminar"
                color="#c07646"
                onPress= {()=> confirmarEliminacion()}
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

export default ProductDetailScreen