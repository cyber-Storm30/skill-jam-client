import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Cover from '../../assets/cover.png';
import ButtonPrimary from '../components/ButtonPrimary';

const Launch = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  const handleNavigation = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        style={{
          width: width,
          height: height / 2,
          borderRadius: 20,
          marginTop: 10,
        }}
        source={Cover}
      />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 40,
          fontSize: 24,
          fontWeight: '500',
          color: '#000',
        }}>
        Find Your <Text style={{color: '#05dac4'}}>New Friends </Text>Here
      </Text>
      <View
        style={{
          width: width,
          alignItems: 'center',
          marginTop: 10,
          fontSize: 16,
          color: '#000',
          // opacity: 0.7,
        }}>
        <Text style={{textAlign: 'center', width: '52%'}}>
          Join us and discover the best pet in your location
        </Text>
      </View>

      <View style={{position: 'absolute', bottom: 20}}>
        <ButtonPrimary
          title="Get Started"
          disabled={false}
          backgroundColor="#1eabac"
          onPress={handleNavigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default Launch;
