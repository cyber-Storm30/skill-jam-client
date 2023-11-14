import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Dog from '../../assets/dog.jpg';

const AnimalCard = ({navigation, data}) => {
  const {width, height} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={{
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}
      onPress={() => {
        navigation.navigate('PetDetails', {data: data});
      }}>
      <Image
        source={{uri: data?.image}}
        style={{width: 110, height: 120, borderRadius: 10}}
      />
      <View
        style={{
          width: '70%',
          backgroundColor: '#fff',
          height: '80%',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          paddingLeft: 10,
          paddingTop: 5,
        }}>
        <Text style={{fontSize: 18, color: 'black'}}>{data?.name}</Text>
        <Text style={{fontSize: 12, color: 'black'}}>{data?.breed}</Text>
        <Text style={{fontSize: 10, color: 'black'}}>
          {data?.age} years old
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnimalCard;
