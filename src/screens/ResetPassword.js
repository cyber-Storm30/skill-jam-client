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
import {set} from 'immer/dist/internal';
import EyeOpen from '../../assets/eyeopen.svg';
import EyeClose from '../../assets/eyeclose.svg';

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

const ResetPassword = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();

  console.log(route.params);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (password && confirmPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await postData('/user/reset/password', {
        email: route?.params?.email,
        password,
      });
      if (res.statusCode === 200) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Something went wrong, try again later');
      }
    } catch (err) {
      Alert.alert('Something went wrong, try again later');
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
              title="Reset your password"
              color="#50C4ED"
              fontSize={24}
              fontWeight={600}
            />
            <CustomText
              title="Enter your new password."
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
              heading="New Password"
              placeholder="Enter your password"
              onChange={val => {
                setPassword(val);
              }}
              name="password"
              value={password}
              secureTextEntry={!showPassword}
              setShowPassword={setShowPassword}
              backgroundColor="transparent"
              icon={!showPassword ? <EyeClose /> : <EyeOpen />}
              required
            />
          </View>
          <View style={{marginBottom: 30}}>
            <Input
              heading="Confirm Password"
              placeholder="Enter your password again"
              onChange={val => {
                setConfirmPassword(val);
              }}
              name="password"
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              backgroundColor="transparent"
              icon={!showConfirmPassword ? <EyeClose /> : <EyeOpen />}
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

export default ResetPassword;
