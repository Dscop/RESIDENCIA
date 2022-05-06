import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import firebase from '../../database/firebase'

const CategoryDetailScreen = (props) => {
    const [categoria, setCategoria]= useState ({
        id: "",
        nombre: ""
    });

    const handleChangeText = (nombre, x) => {
        setCategoria({...categoria, [nombre]:x})
    }

    const getCategoriaById= async (Id) => {
        try {
          const categorias = [];
          await firebase.conexion
          .collection('categorias') 
          .doc(Id)
          .get()
          .then((documentSnapshot) => {
            if(documentSnapshot.exists ) {
                setCategoria ({...categoria,
                id: documentSnapshot.data().id,
                nombre: documentSnapshot.data().nombre
                });
            }
         })
        } catch (e) {
            alert(e);
          }
      };

      useEffect(() => {
        getCategoriaById(props.route.params.categoriaId);
      }, []);

      const updateCategoria = async (prod) => {
        try {
          const categorias = [];
          await firebase.conexion
          .collection('categorias') 
          .doc(prod)
          .update({
            nombre: categoria.nombre  
          })
          .then(() => {
                console.log('Category updated!');
            });
          } catch (e) {
            alert(e);
          }
          props.navigation.navigate('CategoryList');
      };

      const deleteCategoria = async (prod) => {
        try {
          const categorias = [];
          await firebase.conexion
          .collection('categorias') 
          .doc(prod)
          .delete()
          .then(() => {
            props.navigation.navigate('CategoryList');
            });
          } catch (e) {
            alert(e);
          }
        };

        const confirmarEliminacion=()=> {
            Alert.alert('Eliminando categoria', '¿Está seguro que desea eliminar?', 
            [ {text: 'Si', onPress:() => deleteCategoria(props.route.params.categoriaId)},
              {text: 'No', onPress:() => alert("Cancelado")}  
            ])
            
        }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Nombre de la categoria</Text>
                <TextInput placeholder=""
                value = {categoria.nombre} 
                onChangeText = {(x) => handleChangeText('nombre', x )}            
                />
            </View>
            <View>
                <Button title="Actualizar"
                color="#348D68"
                onPress= {()=> updateCategoria(props.route.params.categoriaId)}
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
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        justifyContent: 'center',
    },
})

export default CategoryDetailScreen;