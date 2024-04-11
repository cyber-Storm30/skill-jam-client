import {View, Text, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import AccountImage from '../../assets/account.png';
import {BASE_URI} from '../services/rootService';

const ReviewCard = ({data}) => {
  const {width} = useWindowDimensions();
  console.log(data);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: width - 40,
        alignItems: 'center',
        paddingRight: 20,
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
      }}>
      <Image
        source={{uri: `${BASE_URI}/files/${data?.userId.image}`}}
        style={{width: 40, height: 40, marginRight: 10, borderRadius: 50}}
      />
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#000',
          }}>
          {data?.userId?.name}
        </Text>
        <Text style={{width: width - 100, marginTop: 2}}>{data?.desc}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
