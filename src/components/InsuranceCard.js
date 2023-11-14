import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import Company from '../../assets/company.png';

const InsuranceCard = ({data}) => {
  const {width, height} = useWindowDimensions();

  console.log(data);
  return (
    <View
      style={{
        width: width - 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 20,
        paddingVertical: 20,
      }}>
      <Image source={Company} style={{width: 65, height: 65}} />
      <View
        style={{
          marginLeft: 10,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#000',
            width: width - 150,
          }}>
          Name:-{' '}
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#000',
            }}>
            {data?.name}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#000',
            marginTop: 8,
          }}>
          Eligibilities:-
        </Text>
        {data?.eligibilities?.map((data, idx) => (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#000',
              marginTop: 8,
            }}>
            • {data}
          </Text>
        ))}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#000',
            marginTop: 8,
          }}>
          Key Benefits:-
        </Text>
        {data?.keyBenefits?.map((data, idx) => (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#000',
              marginTop: 8,
              width: '80%',
            }}>
            • {data}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default InsuranceCard;
