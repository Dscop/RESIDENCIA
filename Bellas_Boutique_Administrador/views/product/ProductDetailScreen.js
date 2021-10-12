import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Alert, Picker} from 'react-native'
import firebase from '../../database/firebase'

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

    const [selectedValue, setSelectedValue] = useState("");

    const handleChangeText = (nombre, x) => {
        setProducto({...producto, [nombre]:x})
        setSelectedValue(x)
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
                <Text>Nombre del articulo:</Text>
                <TextInput placeholder=""
                value = {producto.nombre} 
                onChangeText = {(x) => handleChangeText('nombre', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Descripcion:</Text>
                <TextInput placeholder=""
                value = {producto.descripcion} 
                onChangeText = {(x) => handleChangeText('descripcion', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Categoria:</Text>
                <TextInput placeholder="" 
                value = {producto.categoria}
                onChangeText = {(x) => handleChangeText('categoria', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Precio:</Text>
                <TextInput placeholder=""
                value = {producto.precio} 
                onChangeText = {(x) => handleChangeText('precio', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Color:</Text>
                <Picker 
                selectedValue={producto.color}
                
                style={{ height: 50, width: 150 }} 
                onValueChange = {(x) => handleChangeText('color', x )}
                >
                    <Picker.Item label="Selecciona un color" value=""></Picker.Item>
                    <Picker.Item label="Rojo" value="Rojo"></Picker.Item>
                    <Picker.Item label="Blanco" value="Blanco"></Picker.Item>
                    <Picker.Item label="Negro" value="Negro"></Picker.Item>
                    <Picker.Item label="Rosa" value="Rosa"></Picker.Item>
                    <Picker.Item label="Morado" value="Morado"></Picker.Item>
                </Picker>
            </View>
            <View styles={styles.inputGroup}>
                <Text>Inventario:</Text>
                <TextInput placeholder=""
                value = {producto.inventario} 
                onChangeText = {(x) => handleChangeText('inventario', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Talla:</Text>
                <Picker 
                selectedValue={producto.talla}
                value = {producto.talla}
                style={{ height: 50, width: 150 }} 
                onValueChange = {(x) => handleChangeText('talla', x )}

                >
                    <Picker.Item label="Selecciona una talla" value=""></Picker.Item>
                    <Picker.Item label="Extra Chica" value="Extra Chica"></Picker.Item>
                    <Picker.Item label="Chica" value="Chica"></Picker.Item>
                    <Picker.Item label="Mediana" value="Mediana"></Picker.Item>
                    <Picker.Item label="Grande" value="Grande"></Picker.Item>
                    <Picker.Item label="Extra Grande" value="Extra Grande"></Picker.Item>
                </Picker>
            </View>
            <View styles={styles.inputGroup}>
                <Text>Marca:</Text>
                <TextInput placeholder="" 
                value = {producto.marca}
                onChangeText = {(x) => handleChangeText('marca', x )}            
                />
            </View>
            <View styles={styles.inputGroup}>
                <Text>Estado:</Text>
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

export default ProductDetailScreen