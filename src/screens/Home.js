import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import AnimalCard from '../components/AnimalCard';
import {getData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [pets, setPets] = useState([]);
  const [counter, setCounter] = useState();

  const getAllPets = async () => {
    try {
      const res = await getData('/pet');
      setPets(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllPets();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Home" />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e6e6e6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 30,
          paddingBottom: 30,
        }}
        contentContainerStyle={{alignItems: 'center'}}>
        {pets?.map((data, idx) => (
          <AnimalCard navigation={navigation} key={idx} data={data} />
        ))}
        <View style={{marginTop: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
