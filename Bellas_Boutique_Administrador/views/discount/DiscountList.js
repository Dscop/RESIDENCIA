import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../database/firebase";

const DiscountList = (props) => {
  const [descuentos, setDescuentos] = useState([]);

  useEffect(() => {
    firebase.conexion.collection("descuentos").onSnapshot((querySnapshot) => {
      const descuentos = [];
      querySnapshot.docs.forEach((doc) => {
        const { id_articulo, nombre_articulo, precio, descuento, fecha_inicio, fecha_fin } = doc.data();
        descuentos.push({
          id: doc.id,
          id_articulo,
          nombre_articulo,
          precio,
          descuento,
          fecha_inicio,
          fecha_fin
        });
      });
      setDescuentos(descuentos);
    });
  }, []);

  return (
    <ScrollView>

      {descuentos.map((descuentoR) => {
        return (
          <ListItem
            key={descuentoR.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("DiscountDetailScreen", {
                descuentoId: descuentoR.id,
                descuentoIdArticulo: descuentoR.id_articulo,
                descuentoNombreArticulo: descuentoR.nombre_articulo,
                descuentoPrecio: descuentoR.precio,
                descuentoDescuento: descuentoR.descuento,
                descuentoFechaI: descuentoR.fecha_inicio,
                descuentoFechaF: descuentoR.fecha_fin
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{descuentoR.nombre_articulo}</ListItem.Title>
              <ListItem.Subtitle>Id: {descuentoR.id_articulo}</ListItem.Subtitle>
              <ListItem.Subtitle>Precio: {descuentoR.precio}</ListItem.Subtitle>
              <ListItem.Subtitle>Descuento: {descuentoR.descuento}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default DiscountList;