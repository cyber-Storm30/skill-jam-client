import {View, Text, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import Dog from '../../assets/dog.jpg';

const HelathCard = ({data}) => {
  const {width, height} = useWindowDimensions();
  console.log('card', data);
  return (
    <View
      style={{
        width: width - 40,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 20,
      }}>
      <Image
        source={{uri: data?.image}}
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
          {data?.name}
        </Text>
        {data?.disease === 'NA' ? (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
            }}>
            Health status : <Text style={{color: '#00e7bf'}}>Healthy</Text>
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
            }}>
            Health status : <Text style={{color: '#ff0000'}}>Not Healthy</Text>
          </Text>
        )}
        {data?.disease === 'NA' ? (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
            }}>
            Disease : <Text style={{color: '#00e7bf'}}>None</Text>
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
            }}>
            Previous Disease :{' '}
            <Text style={{color: '#00e7bf'}}>{data?.disease}</Text>
          </Text>
        )}
        {/* <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
          }}>
          Previous Disease :{' '}
          <Text style={{color: '#ff4d4d'}}>Canine influenza</Text>
        </Text> */}
      </View>
    </View>
  );
};

export default HelathCard;
