import {View, Text, useWindowDimensions, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import ButtonPrimary from './ButtonPrimary';
import {postData} from '../services/rootService';

const SentRequestCard = ({data, navigation}) => {
  const {width, height} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const handleDeleteRequest = async () => {
    setLoading(true);
    try {
      const res = await postData('/form/delete/request/', {
        requestId: data?._id,
      });
      console.log(res);
      if (res.statusCode === 200) {
        navigation.navigate('Home');
      }
    } catch (err) {
      Alert.alert('Network error,Try again later');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        width: width - 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 20,
        paddingVertical: 20,
      }}>
      <Image
        source={{uri: data?.pet.image}}
        style={{width: 65, height: 65, borderRadius: 50}}
      />
      <View
        style={{
          marginLeft: 10,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#000',
          }}>
          {data?.pet.name}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 5,
          }}>
          Owner : <Text style={{color: 'black'}}>{data?.name}</Text>
        </Text>
        {data?.requestStatus === 'ACCEPTED' && (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Status : <Text style={{color: 'black'}}>{data?.requestStatus}</Text>
          </Text>
        )}
        {data?.requestStatus === 'PENDING' && (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Status : <Text style={{color: 'black'}}>{data?.requestStatus}</Text>
          </Text>
        )}
        {data?.requestStatus === 'PENDING' && (
          <ButtonPrimary
            onPress={handleDeleteRequest}
            customWidth={120}
            customHeight={40}
            backgroundColor="#ff0000"
            title="Delete request"
            loading={loading}
          />
        )}
      </View>
    </View>
  );
};

export default SentRequestCard;
