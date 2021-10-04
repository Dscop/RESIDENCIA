import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Dimensions,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';


import COLORS from '../styles/colors';
import products from '../consts/products';

const width = Dimensions.get('window').width / 2 - 30;

const PrincipalScreen = ({navigation}) => {

    const [catergoryIndex, setCategoryIndex] = React.useState(0);

    const categories = ['POPULAR', 'NOVEDAD', 'REBAJAS', 'ESTILO'];
  
    const CategoryList = () => {
      return (
        <View style={style.categoryContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setCategoryIndex(index)}>
              <Text
                style={[
                  style.categoryText,
                  catergoryIndex === index && style.categoryTextSelected,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    };
  
    const Card = ({product}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DetailScreen', product)}>
          <View style={style.card}>
            <View style={{alignItems: 'flex-end'}}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: product.like
                    ? 'rgba(245, 42, 42,0.2)'
                    : 'rgba(0,0,0,0.2) ',
                }}>
                <Icon
                  name="favorite"
                  size={18}
                  color={product.like ? COLORS.red : COLORS.dark}
                />
              </View>
            </View>
  
            <View
              style={{
                height: 100,
                alignItems: 'center',
              }}>
              <Image
                source={product.img}
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </View>
  
            <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
              {product.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                ${product.price}
              </Text>
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: COLORS.salmon,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 22, color: COLORS.white, fontWeight: 'bold'}}>
                  +
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
        <View style={style.header}>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Bienvenido a</Text>
            <Text style={{fontSize: 38, color: COLORS.salmon, fontWeight: 'bold'}}>
              Bellas Boutique
            </Text>
          </View>
          <Icon name="shopping-cart" size={28} />
        </View>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <View style={style.searchContainer}>
            <Icon name="search" size={25} style={{marginLeft: 20}} />
            <TextInput placeholder="Search" style={style.input} />
          </View>
          <View style={style.sortBtn}>
            <Icon name="sort" size={30} color={COLORS.white} />
          </View>
        </View>
        <CategoryList />
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={products}
          renderItem={({item}) => {
            return <Card product={item} />;
          }}
        />
      </SafeAreaView>
    );
  
};

const style = StyleSheet.create({
    categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
    categoryTextSelected: {
      color: COLORS.salmon,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.salmon,
    },
    card: {
      height: 225,
      backgroundColor: COLORS.light,
      width,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: COLORS.dark,
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: COLORS.salmon,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default PrincipalScreen;
