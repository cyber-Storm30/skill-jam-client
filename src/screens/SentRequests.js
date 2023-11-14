import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import HelathCard from '../components/HelathCard';
import {getData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';
import InsuranceCard from '../components/InsuranceCard';
import RequestCard from '../components/RequestCard';
import {useSelector} from 'react-redux';
import SentRequestCard from '../components/SentRequestCard';

const SentRequests = ({navigation}) => {
  const [requests, setRequests] = useState([]);
  const {height} = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const userDetails = useSelector(state => state.auth.userDetails);
  const getAllCompanies = async () => {
    setLoading(true);
    try {
      const res = await getData(`/form/sent/requests/${userDetails?._id}`);
      console.log(res.data);
      setRequests(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllCompanies();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Sent requests" />
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
        {loading ? (
          <View
            style={{
              height: height - 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={40} />
          </View>
        ) : (
          <>
            {requests.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  height: height,
                  paddingTop: 200,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#2d454e',
                    fontWeight: 'bold',
                  }}>
                  No requests yet !!
                </Text>
              </View>
            ) : (
              <>
                {requests?.map((data, idx) => (
                  <SentRequestCard
                    key={idx}
                    data={data}
                    navigation={navigation}
                  />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SentRequests;
