import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import HelathCard from '../components/HelathCard';
import {getData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';

const PetHealth = ({navigation}) => {
  const [pets, setPets] = useState([]);

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
      <Topbar navigation={navigation} title="Animal Health" />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e6e6e6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 30,
          paddingBottom: 30,
        }}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {pets?.map((data, idx) => (
          <HelathCard navigation={navigation} key={idx} data={data} />
        ))}
        <View style={{marginTop: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetHealth;
