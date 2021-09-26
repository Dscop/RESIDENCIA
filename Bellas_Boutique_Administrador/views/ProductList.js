import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const ProductList = (props) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    firebase.conexion.collection("productos").onSnapshot((querySnapshot) => {
      const productos = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, descripcion, categoria, precio, color, inventario, talla, marca, estado } = doc.data();
        productos.push({
          id: doc.id,
          nombre,
          descripcion,
          categoria,
          precio,
          color,
          inventario,
          talla,
          marca,
          estado
        });
      });
      setProductos(productos);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateProductScreen")}
        title="Agregar articulo"
      />
      {productos.map((producto) => {
        return (
          <ListItem
            key={producto.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("ProductDetailScreen", {
                productoId: producto.id,
                productoNombre: producto.nombre,
                productoDescripcion: producto.descripcion,
                ProductoCategoria: producto.categoria,
                productoPrecio: producto.precio,
                productoColor: producto.color,
                productoInventario: producto.inventario,
                productoTalla: producto.talla,
                productoMarca: producto.marca,
                productoEstado: producto.estado
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
              <ListItem.Title>{producto.nombre}</ListItem.Title>
              <ListItem.Subtitle>{producto.color}</ListItem.Subtitle>
              <ListItem.Subtitle>{producto.talla}</ListItem.Subtitle>
              <ListItem.Subtitle>{producto.marca}</ListItem.Subtitle>
              <ListItem.Subtitle>{producto.inventario}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default ProductList;