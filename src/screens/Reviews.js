import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import {getData, postData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';
import ReviewCard from '../components/ReviewCard';
import Input from '../components/Input';
import Arrow from '../../assets/send.png';
import {useSelector} from 'react-redux';

const Reviews = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [counter, setCounter] = useState(0);
  const userDetails = useSelector(state => state.auth.userDetails);

  const getAllCompanies = async () => {
    try {
      const res = await getData('/user/get/review');
      console.log('res', res);
      setReviews(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    }
  };

  const handleSendReview = async () => {
    if (review.length > 0) {
      try {
        const res = await postData('/user/review', {
          desc: review,
          userId: userDetails?._id,
        });
        if (res.statusCode === 200) {
          setReview('');
          setCounter(counter + 1);
          Alert.alert('Review posted succesfully');
        }
      } catch (err) {
        Alert.alert('Something went wrong,try again later');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllCompanies();
    }, [counter]),
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Reviews" />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e6e6e6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 30,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {reviews?.map((data, idx) => (
          <ReviewCard key={idx} data={data} />
        ))}
        <View style={{marginTop: 30}} />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
        }}>
        <Input
          placeholder="Enter your review"
          onChange={val => {
            setReview(val);
          }}
          name="review"
          widthProp={width - 70}
          value={review}
          backgroundColor="transparent"
        />
        <TouchableOpacity onPress={handleSendReview}>
          <Image
            source={Arrow}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              marginTop: 30,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Reviews;
