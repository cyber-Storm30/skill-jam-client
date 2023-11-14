import {View, Text, useWindowDimensions, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import Dog from '../../assets/dog.jpg';
import ButtonPrimary from './ButtonPrimary';
import RequestModal from './RequestModal';

const RequestCard = ({data, navigation}) => {
  const {width, height} = useWindowDimensions();
  console.log('card', data);
  const [open, setOpen] = useState(false);
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
      {open && (
        <RequestModal
          open={open}
          setOpen={setOpen}
          data={data}
          navigation={navigation}
        />
      )}
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
            marginBottom: 10,
          }}>
          Sender : <Text style={{color: 'black'}}>{data?.name}</Text>
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
        <ButtonPrimary
          onPress={() => {
            setOpen(true);
          }}
          customWidth={100}
          customHeight={40}
          title="View details"
        />
      </View>
    </View>
  );
};

export default RequestCard;
