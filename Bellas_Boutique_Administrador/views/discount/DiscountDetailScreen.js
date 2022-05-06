import React,{useState, useEffect} from 'react'
import {View, Text, Button, TextInput, ScrollView, StyleSheet, Alert} from 'react-native'
import firebase from '../../database/firebase'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '@react-native-community/datetimepicker';

const DiscountDetailScreen = (props) => {
  
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


    const [descuentoR, setDescuentoR]= useState ({
        id: "",
        id_articulo: "",
        nombre_articulo: "",
        precio: "",
        descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    const handleChangeText = (id_articulo, x) => {
        setDescuentoR({...descuentoR, [id_articulo]:x})
    }

    const getDescuentoById= async (Id) => {
        try {
          const descuentos = [];
          await firebase.conexion
          .collection('descuentos') 
          .doc(Id)
          .get()
          .then((documentSnapshot) => {
            if(documentSnapshot.exists ) {
                setDescuentoR ({...descuentoR,
                id: documentSnapshot.data().id,
                id_articulo: documentSnapshot.data().id_articulo,
                nombre_articulo: documentSnapshot.data().nombre_articulo,
                precio: documentSnapshot.data().precio,
                descuento: documentSnapshot.data().descuento,
                fecha_inicio: documentSnapshot.data().fecha_inicio,
                fecha_fin: documentSnapshot.data().fecha_fin
                });
            }
         })
        } catch (e) {
            alert(e);
          }
      };

      useEffect(() => {
        getDescuentoById(props.route.params.descuentoId);
      }, []);

      const updateDescuento = async (prod) => {
        try {
          const descuentos = [];
          await firebase.conexion
          .collection('descuentos') 
          .doc(prod)
          .update({
            id_articulo: descuentoR.id_articulo,
            nombre_articulo: descuentoR.nombre_articulo,
            precio: descuentoR.precio,
            descuento: descuentoR.descuento,
            fecha_inicio: descuentoR.fecha_inicio,
            fecha_fin: descuentoR.fecha_fin 
          })
          .then(() => {
                console.log('Discount updated!');
            });
          } catch (e) {
            alert(e);
          }
          props.navigation.navigate('DiscountList');
      };

      const deleteDescuento = async (prod) => {
        try {
          const descuentos = [];
          await firebase.conexion
          .collection('descuentos') 
          .doc(prod)
          .delete()
          .then(() => {
            props.navigation.navigate('DiscountList');
            });
          } catch (e) {
            alert(e);
          }
        };

        const confirmarEliminacion=()=> {
            Alert.alert('Eliminando descuento', '¿Está seguro que desea eliminar?', 
            [ {text: 'Si', onPress:() => deleteDescuento(props.route.params.descuentoId)},
              {text: 'No', onPress:() => alert("Cancelado")}  
            ])
            
        }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Id del articulo:</Text>
                <TextInput placeholder=""
                value = {descuentoR.id_articulo} 
                onChangeText = {(x) => handleChangeText('id_articulo', x )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Nombre del articulo:</Text>
                <TextInput placeholder=""
                value = {descuentoR.nombre_articulo} 
                onChangeText = {(x) => handleChangeText('nombre_articulo', x )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Precio:</Text>
                <TextInput placeholder=""
                value = {descuentoR.precio} 
                onChangeText = {(x) => handleChangeText('precio', x )}            
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Descuento:</Text>
                <TextInput placeholder=""
                value = {descuentoR.descuento} 
                onChangeText = {(x) => handleChangeText('descuento', x )}            
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
                value = {descuentoR.fecha_inicio} 
                onChangeText = {(x) => handleChangeText('fecha_inicio', x )}            
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
                value = {descuentoR.fecha_fin} 
                onChangeText = {(x) => handleChangeText('fecha_fin', x )}            
                />
            </View>
            <View>
                <Button title="Actualizar"
                color="#348D68"
                onPress= {()=> updateDescuento(props.route.params.descuentoId)}
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

export default DiscountDetailScreen;