import React,{useState, useEffect, Component} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Picker, Alert} from 'react-native'
import firebase from '../../database/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '@react-native-community/datetimepicker';

const CreateDiscountScreen = (props) => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
      const onChange = (event, selectedDate) => {
          const currentDate = selectedDate || date;
          setShow(Platform.OS === 'ios');
          setDate(currentDate);
        };
      
        const showMode = (currentMode) => {
          setShow(true);
          setMode(currentMode);
        };
      
        const showDatepicker = () => {
          showMode('date');
        };

    const [productoD, setProductoD]= useState ({
        id: "",
        nombre: "",
        precio: ""
    });

    const [nstate, setNState]= useState ({
        descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    const handleChangeText = (descuento, value) => {
        setNState({...nstate, [descuento]:value})
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
        if( productoD.id==='' || productoD.nombre==='' || productoD.precio==='' || nstate.descuento==='' || nstate.fecha_inicio==='' || nstate.fecha_fin===''){
            alert('No dejar campos vacios')
        }else{
            await firebase.conexion.collection('descuentos') .add({
                id_articulo: productoD.id,
                nombre_articulo: productoD.nombre,
                precio: productoD.precio,
                descuento: nstate.descuento,
                fecha_inicio: nstate.fecha_inicio,
                fecha_fin: nstate.fecha_fin
            })
            props.navigation.navigate('ProductList');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Id del articulo:</Text>
                <TextInput placeholder=""
                value = {productoD.id} 
                onChangeText = {(Value) => handleChangeText('id', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Nombre del articulo:</Text>
                <TextInput placeholder="" 
                value = {productoD.nombre}
                onChangeText = {(Value) => handleChangeText('nombre', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Precio:</Text>
                <TextInput placeholder="" 
                value = {productoD.precio}
                onChangeText = {(Value) => handleChangeText('precio', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Porcentaje de descuento:</Text>
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('descuento', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Fecha de inicio:</Text>
                <Icon name="book-online" size={28} onPress={showDatepicker} />
                {show && (
                    <DatePicker
                    testID="datePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    color="red"
                    />
                )}
                <TextInput placeholder="" 
                onChangeText = {(Value) => handleChangeText('fecha_inicio', Value )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Fecha de fin:</Text>
                {/*<Icon name="calendar-today" size={28} onPress={showDatepicker} />
                {show && (
                    <DatePicker
                    testID="datePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    color="red"
                    />
                )}*/}
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

export default CreateDiscountScreen