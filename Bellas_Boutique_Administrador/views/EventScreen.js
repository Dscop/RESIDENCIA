import React, { useState } from 'react'
import {View,Button, StyleSheet} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker';

const EventScreen = (props) =>{   
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

    return (
    <View style={styles.container}>
        <View>
        <View>
            <Button onPress={showDatepicker} title="Fecha Inicial" />
        </View>
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
        </View>  
    </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        padding:35,
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc',
    },
})

export default EventScreen
