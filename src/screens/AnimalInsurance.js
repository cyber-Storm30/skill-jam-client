import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import HelathCard from '../components/HelathCard';
import {getData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';
import InsuranceCard from '../components/InsuranceCard';

const AnimalInsurance = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [company, setCompany] = useState([]);

  const getAllCompanies = async () => {
    try {
      const res = await getData('/company');
      setCompany(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllCompanies();
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Animal Insurance" />
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
        {company?.map((data, idx) => (
          <InsuranceCard key={idx} data={data} />
        ))}
        <View style={{marginTop: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimalInsurance;
