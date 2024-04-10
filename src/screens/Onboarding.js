import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonPrimary from '../components/ButtonPrimary';
import Input from '../components/Input';
import {BASE_URI, postData} from '../services/rootService';
import {setUserDetails} from '../redux/auth';
import ProfileButton from '../../assets/uploadIcon.png';
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

  const [collage, setCollage] = useState('');
  const [job, setJob] = useState('');
  const [hobby, setHobby] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (name && mobile && collage && hobbies.length > 0 && job) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, mobile, job, hobbies, collage]);

  const handleAddHobby = event => {
    let newData = hobbies.slice();
    newData.push(event.nativeEvent.text);
    setHobbies(newData);
    setHobby('');
  };

  const handleRemoveHobby = id => {
    console.log(id);
    const newData = hobbies.filter((data, idx) => {
      return id !== idx;
    });
    setHobbies(newData);
  };

  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: 150,
        height: 188,
        cropping: true,
      }).then(img => {
        setImage(img);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(image);
    const pathArray = image.path.split('/').slice(-1);
    const imgName = pathArray[0];
    const formData = new FormData();
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: imgName,
    });
    const URL = `${BASE_URI}/upload`;
    const res = await fetch(URL, {
      method: 'post',
      body: formData,
    });
    if (res.status === 200) {
      let data;
      try {
        setLoading(true);
        data = await postData('/user/save/form', {
          userId: route?.params?.userId,
          name,
          mobile,
          hobbies,
          job,
          image: imgName,
          collage,
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
    }
  };

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView
            style={{
              height: height + 100,
            }}
            contentContainerStyle={{
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width,
                paddingTop: 32,
                paddingHorizontal: 20,
              }}>
              <CustomText
                title="Enter basic details"
                color="#50C4ED"
                fontSize={24}
                fontWeight={600}
                marginBottom={30}
              />
            </View>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              {image ? (
                <View>
                  <Image
                    source={{uri: image.path}}
                    style={{width: 100, height: 100, borderRadius: 50}}
                  />
                  <TouchableOpacity onPress={openGallery}>
                    <CustomText
                      title="Change"
                      color="#50C4ED"
                      fontSize={14}
                      fontFamily="Montserrat-Medium"
                      fontWeight={400}
                      textAlign="center"
                      marginTop={7}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={openGallery}>
                  <Image
                    source={ProfileButton}
                    style={{width: 80, height: 80}}
                  />
                </TouchableOpacity>
              )}
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
                heading="Collage"
                placeholder="Enter your collage name"
                onChange={val => {
                  setCollage(val);
                }}
                name="collage"
                value={collage}
                backgroundColor="transparent"
                required
              />
            </View>
            <View style={{marginBottom: 15}}>
              <Input
                heading="Job"
                placeholder="Enter your job"
                onChange={val => {
                  setJob(val);
                }}
                name="job"
                value={job}
                backgroundColor="transparent"
                required
              />
            </View>
            <View style={{marginBottom: 15, width: width - 40}}>
              <Text
                style={{
                  color: '#000',
                  marginRight: 5,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                }}>
                Hobbies {<Text style={{color: '#50C4ED'}}>*</Text>}
              </Text>
              <TextInput
                placeholder="Enter your hobbies"
                onChange={val => setHobby(val)}
                value={hobby}
                onSubmitEditing={handleAddHobby}
                backgroundColor="transparent"
                required
                style={{
                  color: '#000',
                  width: '100%',
                  fontFamily: 'Montserrat-Regular',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: 50,
                  backgroundColor: 'transparent',
                  borderRadius: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 8,
                  borderWidth: 1,
                  // borderColor: error ? 'red' : focused ? '#50C4ED' : '##50C4ED20',
                }}
              />
            </View>
            <View
              style={{
                width: width - 40,
                flexDirection: 'row',
              }}>
              {hobbies?.map((data, idx) => (
                <TouchableOpacity
                  onPress={() => {
                    handleRemoveHobby(idx);
                  }}
                  key={idx}
                  style={{
                    marginRight: 10,
                    marginBottom: 20,
                    backgroundColor: '#387ADF',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 12,
                  }}>
                  <Text style={{color: 'white'}}>{data}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <ButtonPrimary
              title="Submit"
              onPress={handleSubmit}
              disabled={disabled}
              loading={loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        {/* <Toast config={toastConfig} visibilityTime={1600} /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Onboarding;
