import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import firebase from '../../database/firebase'

const BrandDetailScreen = (props) => {
    const [marca, setMarca]= useState ({
        id: "",
        nombre: ""
    });

    const handleChangeText = (nombre, x) => {
        setMarca({...marca, [nombre]:x})
    }

    const getMarcaById= async (Id) => {
        try {
          const marcas = [];
          await firebase.conexion
          .collection('marcas') 
          .doc(Id)
          .get()
          .then((documentSnapshot) => {
            if(documentSnapshot.exists ) {
                setMarca ({...marca,
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
        getMarcaById(props.route.params.marcaId);
      }, []);

      const updateMarca = async (prod) => {
        try {
          const marcas = [];
          await firebase.conexion
          .collection('marcas') 
          .doc(prod)
          .update({
            nombre: marca.nombre  
          })
          .then(() => {
                console.log('Brand updated!');
            });
          } catch (e) {
            alert(e);
          }
          props.navigation.navigate('BrandsList');
      };

      const deleteMarca = async (prod) => {
        try {
          const marcas = [];
          await firebase.conexion
          .collection('marcas') 
          .doc(prod)
          .delete()
          .then(() => {
            props.navigation.navigate('BrandsList');
            });
          } catch (e) {
            alert(e);
          }
        };

        const confirmarEliminacion=()=> {
            Alert.alert('Eliminando marca', '¿Está seguro que desea eliminar?', 
            [ {text: 'Si', onPress:() => deleteMarca(props.route.params.marcaId)},
              {text: 'No', onPress:() => alert("Cancelado")}  
            ])
            
        }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Nombre de la marca</Text>
                <TextInput placeholder=""
                value = {marca.nombre} 
                onChangeText = {(x) => handleChangeText('nombre', x )}            
                />
            </View>
            <View>
                <Button title="Actualizar"
                color="#348D68"
                onPress= {()=> updateMarca(props.route.params.marcaId)}
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

export default BrandDetailScreen;