import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Topbar from '../components/Topbar';
import Account from '../../assets/account.png';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';
import ButtonPrimary from '../components/ButtonPrimary';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/auth';
import {BASE_URI, postData} from '../services/rootService';
import UserPosts from '../components/UserPosts';

const Profile = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const user = useSelector(state => state.auth.user);
  const userDetails = useSelector(state => state.auth.userDetails);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const res = await postData(`/user/delete/`, {
        userId: user?._id,
      });
      console.log('res', res);
      if (res.statusCode === 200) {
        dispatch(logout());
        navigation.navigate('Launch');
      } else {
        Alert.alert('Something went wrong, try again later');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong, try again later');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Profile" />
      <View style={{width: width, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          hitSlop={10}
          style={{position: 'absolute', zIndex: 111, right: 50}}>
          <Image source={Edit} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete account',
              'Are you sure, you want to delete your acount ?',
              [
                {
                  text: 'Delete',
                  onPress: () => handleDelete(),
                  style: 'destructive',
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('cancel'),
                  style: 'cancel',
                },
              ],
            );
          }}
          hitSlop={10}
          style={{position: 'absolute', zIndex: 111, right: 20}}>
          <Image source={Delete} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        {userDetails?.image.length <= 0 ? (
          <Image
            source={Account}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        ) : (
          <Image
            source={{uri: `${BASE_URI}/files/${userDetails.image}`}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        )}
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
            color: '#000',
            marginTop: 10,
          }}>
          {userDetails?.name}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '500',
            color: '#141414',
          }}>
          {userDetails.job}
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <Text style={{fontSize: 16, fontWeight: 500, color: '#141414'}}>
          Your Posts
        </Text>
      </View>
      <UserPosts navigation={navigation} />
    </SafeAreaView>
  );
};

export default Profile;
