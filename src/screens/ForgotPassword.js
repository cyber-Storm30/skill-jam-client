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
import {useDispatch} from 'react-redux';
import {setUser, setUserDetails} from '../redux/auth';
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

const ForgotPassword = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && !emailError) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, emailError]);

  useEffect(() => {
    // if (password.length === 0) {
    //   setPasswordError(false);
    // }
    if (email.length === 0) {
      setEmailError(false);
    }
    () => {
      return () => {
        // setPasswordError(false);
        setEmailError(false);
      };
    };
  }, [email]);

  const handleSubmit = async () => {
    navigation.navigate('ResetPassword', {email: email});
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
              title="Forgot Password"
              color="#50C4ED"
              fontSize={24}
              fontWeight={600}
            />
            <CustomText
              title="Enter your email to reset your password."
              color="#2d454e"
              fontSize={14}
              opacity={0.7}
              fontFamily="Montserrat-Regular"
              fontWeight={600}
              marginBottom={40}
            />
          </View>
          <View style={{marginBottom: 30}}>
            <Input
              heading="Email"
              placeholder="Enter Email"
              onChange={val => {
                setEmail(val);
              }}
              name="email"
              value={email}
              backgroundColor="transparent"
              required
            />
          </View>
          <ButtonPrimary
            title="Next"
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

export default ForgotPassword;
