import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../../database/firebase";

const BrandsList = (props) => {
    const [marcas, setMarcas] = useState([]);

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
    }, []);
  
    return (
      <ScrollView>
        <Button
          onPress={() => props.navigation.navigate("CreateBrandScreen")}
          title="Agregar marca"
        />
        {marcas.map((marca) => {
          return (
            <ListItem
              key={marca.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("BrandDetailScreen", {
                  marcaId: marca.id,
                  marcaNombre: marca.nombre
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
                <ListItem.Title>{marca.nombre}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    );
};

export default BrandsList;