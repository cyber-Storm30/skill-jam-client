import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import Dog from '../../assets/dog.jpg';
import BackButton from '../../assets/back.png';
import React, {useCallback, useState} from 'react';
import Paw1Icon from '../../assets/paw1.png';
import Paw2Icon from '../../assets/paw2.png';
import Paw3Icon from '../../assets/paw3.png';
import ButtonPrimary from '../components/ButtonPrimary';
import AnimalCard from '../components/AnimalCard';
import AccountImage from '../../assets/account.png';
import ReviewCard from '../components/ReviewCard';
import AdoptionForm from '../components/AdoptionForm';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {postData} from '../services/rootService';

const PetDetails = ({navigation, route}) => {
  const {data} = route?.params;
  const [open, setOpen] = useState(false);
  const [isReqSent, setIsReqSent] = useState(false);
  const userDetails = useSelector(state => state.auth.userDetails);
  const {width, height} = useWindowDimensions();

  const checkRequestSent = async () => {
    try {
      const res = await postData('/pet/check/request/status', {
        sender: userDetails?._id,
        pet: data?._id,
      });
      console.log('res', res);
      if (res.statusCode === 200) {
        setIsReqSent(true);
      } else {
        setIsReqSent(false);
      }
    } catch (err) {
      Alert.alert('Something went wrong,try again later');
    }
  };
  useFocusEffect(
    useCallback(() => {
      checkRequestSent();
    }, [open]),
  );
  const handleOpenForm = () => {
    setOpen(true);
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={BackButton}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <Image
        source={{uri: data?.image}}
        style={{width: width, height: height / 2}}
      />
      <ScrollView
        style={{
          width,
          height: height / 2,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{fontSize: 24, color: 'black', fontWeight: '500'}}>
            {data?.name}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400'}}>{data.breed}</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#91cb95',
              height: 80,
              width: width / 3.6,
              borderRadius: 12,
              marginRight: 10,
              paddingTop: 15,
            }}>
            <Image
              source={Paw1Icon}
              style={{
                position: 'absolute',
                width: 35,
                height: 35,
                bottom: 2,
                right: 2,
                zIndex: -222,
                transform: [{rotate: '325deg'}],
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: '#000',
              }}>
              {data?.sex}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
              }}>
              Sex
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fabf66',
              height: 80,
              width: width / 3.6,
              borderRadius: 12,
              paddingTop: 15,
              marginRight: 10,
            }}>
            <Image
              source={Paw2Icon}
              style={{
                position: 'absolute',
                width: 35,
                height: 35,
                bottom: 2,
                right: 2,
                zIndex: -222,
                transform: [{rotate: '325deg'}],
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: '#000',
              }}>
              {data?.age} years
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
              }}>
              Age
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#7abfd5',
              height: 80,
              width: width / 3.6,
              borderRadius: 12,
              paddingTop: 15,
            }}>
            <Image
              source={Paw3Icon}
              style={{
                position: 'absolute',
                width: 35,
                height: 35,
                bottom: 2,
                right: 2,
                zIndex: -222,
                transform: [{rotate: '325deg'}],
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
                color: '#000',
              }}>
              {data?.weight}kg
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '500',
              }}>
              Weight
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingBottom: 20,
            flexDirection: 'row',
            width: width,
            alignItems: 'center',
          }}>
          <Image
            source={AccountImage}
            style={{width: 35, height: 35, marginRight: 10}}
          />
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '500',
                color: '#000',
              }}>
              {data?.userId?.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontWeight: '500',
              }}>
              {data?.name}'s owner
            </Text>
          </View>
        </View>
        <Text>{data?.desc}</Text>
        {/* <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: '#000',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Reviews
          </Text>
          <ReviewCard />
        </View> */}
        {open && <AdoptionForm open={open} setOpen={setOpen} data={data} />}
        <View
          style={{
            justifyContent: 'flex-start',
            marginBottom: 40,
            marginTop: 20,
          }}>
          {userDetails?._id === data?.userId._id ? (
            <ButtonPrimary
              onPress={() => {
                navigation.navigate('EditPet', data);
              }}
              title="Edit details"
              customWidth={width - 40}
            />
          ) : (
            <>
              {isReqSent ? (
                <ButtonPrimary
                  onPress={() => {
                    navigation.navigate('SentRequests');
                  }}
                  title="View request status"
                  customWidth={width - 40}
                />
              ) : (
                <ButtonPrimary
                  onPress={handleOpenForm}
                  title="Send Adoption Request"
                  customWidth={width - 40}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetDetails;
