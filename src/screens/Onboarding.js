import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import ButtonPrimary from '../components/ButtonPrimary';
import Input from '../components/Input';
import {postData} from '../services/rootService';
import {setUserDetails} from '../redux/auth';
import {useDispatch} from 'react-redux';
// import EyeOpen from '../../../assets/eyeopen.svg';
// import EyeClose from '../../../assets/eyeclose.svg';

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

const Onboarding = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

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
      data = await postData('/user/save/form', {
        userId: route?.params?.userId,
        name,
        mobile,
        address,
      });
      if (data?.statusCode === 200) {
        dispatch(setUserDetails(data));
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
          <View
            style={{
              width: width,
              paddingTop: 32,
              paddingHorizontal: 20,
            }}>
            <CustomText
              title="Enter basic details"
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

export default Onboarding;
