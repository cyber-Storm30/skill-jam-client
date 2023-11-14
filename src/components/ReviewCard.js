import {View, Text, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import AccountImage from '../../assets/account.png';

const ReviewCard = ({data}) => {
  const {width} = useWindowDimensions();
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
        source={AccountImage}
        style={{width: 25, height: 25, marginRight: 10}}
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
