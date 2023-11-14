import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import ButtonPrimary from '../components/ButtonPrimary';
import Input from '../components/Input';
import {postData} from '../services/rootService';
import {setUserDetails} from '../redux/auth';
import BackButton from '../../assets/back.png';
import {useDispatch, useSelector} from 'react-redux';

const toastConfig = {
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#EB5757',
        backgroundColor: '#EB5757',
        height: 40,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontFamily: 'Montserrat-regular',
        color: '#FCFCFC',
      }}
    />
  ),
};

const EditProfile = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const userDetails = useSelector(state => state.auth.userDetails);

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(userDetails?.name);
  const [mobile, setMobile] = useState(userDetails?.mobile);
  const [address, setAddress] = useState(userDetails?.address);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name && mobile && address) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, mobile, address]);

  const handleSubmit = async () => {
    let data;
    try {
      setLoading(true);
      data = await postData('/user/edit/form', {
        userDetailsId: userDetails?._id,
        name,
        mobile,
        address,
      });
      console.log('edit profile', data);
      if (data?.statusCode === 200) {
        dispatch(setUserDetails(data.data));
        navigation.navigate('Home');
      } else {
        Alert.alert('Something went wrong,try again later');
      }
    } catch (err) {
      Alert.alert('Network error,try again later');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 15,
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
          <View
            style={{
              width: width,
              paddingTop: 32,
              paddingHorizontal: 20,
            }}>
            <CustomText
              title="Edit you profile details"
              color="#1eabac"
              fontSize={24}
              fontWeight={600}
              marginBottom={30}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Input
              heading="Name"
              placeholder="Enter your name"
              onChange={val => {
                setName(val);
              }}
              name="name"
              value={name}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Input
              heading="Mobile Number"
              placeholder="Enter your contact number"
              onChange={val => {
                setMobile(val);
              }}
              name="mobile"
              value={mobile}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Input
              heading="Address"
              placeholder="Enter your current address"
              onChange={val => {
                setAddress(val);
              }}
              name="address"
              value={address}
              backgroundColor="transparent"
              required
            />
          </View>
          <ButtonPrimary
            title="Submit"
            onPress={handleSubmit}
            disabled={disabled}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* <Toast config={toastConfig} visibilityTime={1600} /> */}
    </SafeAreaView>
  );
};

export default EditProfile;
