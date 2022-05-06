import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Picker} from 'react-native'
import { Value } from 'react-native-reanimated';
import firebase from '../../database/firebase'

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

    const [selectedValue, setSelectedValue] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleChangeText = (nombre, value) => {
        setState({...state, [nombre]:value})
        setSelectedValue(value)
    }

    useEffect(() => {
        firebase.conexion.collection("marcas").onSnapshot((querySnapshot) => {
            const marcas = [];
            querySnapshot.docs.forEach((doc) => {
              const { nombre } = doc.data();
              marcas.push({
                id: doc.id,
                nombre
              });
            });
            setMarcas(marcas);
          });
          firebase.conexion.collection("categorias").onSnapshot((querySnapshot) => {
            const categorias = [];
            querySnapshot.docs.forEach((doc) => {
              const { nombre } = doc.data();
              categorias.push({
                id: doc.id,
                nombre
              });
            });
            setCategorias(categorias);
          });

    }, []);

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
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Nombre del articulo:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Descripcion:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('descripcion', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Categoria:</Text>
                <Picker 
                selectedValue={state.categoria}
                value = {state.categoria}
                style={{ height: 50, width: 150 }} 
                onValueChange = {(Value) => handleChangeText('categoria', Value )}
                >
                    <Picker.Item label="Selecciona una categoria" value=""></Picker.Item>
                    {categorias.map((categoria) => {
                        return(
                        <Picker.Item label={categoria.nombre} value={categoria.nombre}></Picker.Item>
                        );
                    })}
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Precio:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('precio', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Color:</Text>
                <Picker 
                selectedValue={state.color}
                style={{ height: 50, width: 150 }}
                onValueChange = {(Value) => handleChangeText('color', Value )}
                >
                    <Picker.Item label="Selecciona un color" value=""></Picker.Item>
                    <Picker.Item label="Rojo" value="Rojo"></Picker.Item>
                    <Picker.Item label="Blanco" value="Blanco"></Picker.Item>
                    <Picker.Item label="Negro" value="Negro"></Picker.Item>
                    <Picker.Item label="Rosa" value="Rosa"></Picker.Item>
                    <Picker.Item label="Morado" value="Morado"></Picker.Item>
                    <Picker.Item label="Azul" value="Azul"></Picker.Item>
                    <Picker.Item label="Amarillo" value="Amarillo"></Picker.Item>
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Inventario:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('inventario', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Talla:</Text>
                <Picker 
                selectedValue={state.talla}
                style={{ height: 50, width: 150 }}
                onValueChange = {(Value) => handleChangeText('talla', Value )}
                >
                    <Picker.Item label="Selecciona una talla" value=""></Picker.Item>
                    <Picker.Item label="Extra Chica" value="Extra Chica"></Picker.Item>
                    <Picker.Item label="Chica" value="Chica"></Picker.Item>
                    <Picker.Item label="Mediana" value="Mediana"></Picker.Item>
                    <Picker.Item label="Grande" value="Grande"></Picker.Item>
                    <Picker.Item label="Extra Grande" value="Extra Grande"></Picker.Item>
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Marca:</Text>
                <Picker 
                selectedValue={state.marca}
                value = {state.marca}
                style={{ height: 50, width: 150 }} 
                onValueChange = {(Value) => handleChangeText('marca', Value )}
                >
                    <Picker.Item label="Selecciona una marca" value=""></Picker.Item>
                    {marcas.map((marca) => {
                        return(
                        <Picker.Item label={marca.nombre} value={marca.nombre}></Picker.Item>
                        );
                    })}
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text>Estado:</Text>
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
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        justifyContent: 'center',
    },
})

export default CreateProductScreen