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

const Login = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const multiErrorMessage = [
    'Doesn’t meet of the one or more parameters',
    'Minimum of 8 characters, with upper case, a number and a symbol ( !@#$%^ )',
  ];

  useEffect(() => {
    if (password && email && !emailError) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email, emailError]);

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
  }, [password, email]);

  const handleNavigation = () => {
    setEmailError(false);
    navigation.navigate('Signup');
  };

  const handleSubmit = async () => {
    let data;
    try {
      setLoading(true);
      data = await postData('/user/login', {
        email: email,
        password,
      });
      console.log('data', data);
      if (data?.statusCode === 200) {
        dispatch(setUser(data?.user));
        dispatch(setUserDetails(data?.userDetails));
        navigation.navigate('Home');
      } else if (data?.status === 404) {
        Alert.alert('You are not yet registered');
      } else {
        Alert.alert('Wrong credentials');
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
              title="Welcome Back"
              color="#50C4ED"
              fontSize={24}
              fontWeight={600}
            />
            <CustomText
              title="Enter your credentials to access your account."
              color="#2d454e"
              fontSize={14}
              opacity={0.7}
              fontFamily="Montserrat-Regular"
              fontWeight={600}
              marginBottom={40}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Input
              heading="Email"
              placeholder="Enter Email"
              onChange={val => {
                setEmail(val);
              }}
              name="email"
              value={email}
              errorMessage="Not a valid email format"
              error={emailError}
              setError={setEmailError}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 5}}>
            <Input
              heading="Password"
              placeholder="Enter Password"
              multiErrorMessage={multiErrorMessage}
              onChange={val => {
                setPassword(val);
              }}
              name="password"
              value={password}
              secureTextEntry={!showPassword}
              setShowPassword={setShowPassword}
              // icon={!showPassword ? <EyeClose /> : <EyeOpen />}
              backgroundColor="transparent"
              required
            />
          </View>
          <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{
              fontSize: 12,
              fontWeight: '300',
              color: '#2d454e',
              marginBottom: 20,
              textAlign: 'right',
              width: width - 40,
              marginBottom: 20,
              textDecorationLine: 'underline',
            }}>
            forgot password?
          </Text>
          <ButtonPrimary
            title="Login"
            onPress={handleSubmit}
            disabled={disabled}
            loading={loading}
          />
          <View
            style={{
              alignItems: 'center',
              fontFamily: 'Montserrat-Regular',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                fontWeight: '400',
                marginTop: 3,
                fontFamily: 'Montserrat-Regular',
              }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              hitSlop={{top: 25, bottom: 25, left: 20, right: 15}}
              onPress={handleNavigation}>
              <Text
                style={{
                  fontSize: 13,
                  color: '#50C4ED',
                  fontWeight: '600',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <Toast config={toastConfig} visibilityTime={1600} /> */}
    </SafeAreaView>
  );
};

export default Login;
