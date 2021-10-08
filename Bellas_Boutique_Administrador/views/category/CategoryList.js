import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../database/firebase";

const CategoryList = (props) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
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

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateCategoryScreen")}
        title="Agregar categoria"
      />
      {categorias.map((categoria) => {
        return (
          <ListItem
            key={categoria.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("CategoryDetailScreen", {
                categoriaId: categoria.id,
                categoriaNombre: categoria.nombre
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
              <ListItem.Title>{categoria.nombre}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};
export default CategoryList;