import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from '../services/rootService';
import {useSelector} from 'react-redux';
import PostCard from './PostCard';

const UserPosts = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const userDetails = useSelector(state => state.auth.userDetails);

  const getUserPosts = async () => {
    try {
      const res = await getData(`/user/posts/${userDetails?._id}`);
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserPosts();
    }, []),
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,
      }}
      contentContainerStyle={{alignItems: 'center'}}>
      {posts?.map((data, idx) => (
        <PostCard
          data={data}
          key={idx}
          showIcon="true"
          posts={posts}
          setPosts={setPosts}
          navigation={navigation}
        />
      ))}
      <View style={{marginTop: 30}} />
    </ScrollView>
  );
};

export default UserPosts;
