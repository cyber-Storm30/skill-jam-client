import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Cover from '../../assets/cover.jpg';
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
          paddingHorizontal: 20,
        }}>
        Unlock Your <Text style={{color: '#50C4ED'}}>Potential </Text> Connect
        with Experts
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
          Dive into endless possibilities with Skill Jam Connect.
        </Text>
      </View>

      <View style={{position: 'absolute', bottom: 20}}>
        <ButtonPrimary
          title="Get Started"
          disabled={false}
          backgroundColor="#50C4ED"
          onPress={handleNavigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default Launch;
