import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from '../components/Topbar';
import {getData} from '../services/rootService';
import {useFocusEffect} from '@react-navigation/native';
import PostCard from '../components/PostCard';
import {BASE_URI} from '../services/rootService';
import VideoPlayer from 'react-native-video-player';
import VideoWebView from '../components/VideoWebView';
import FilterIcon from '../../assets/filter.png';
import Filter from '../components/Filter';

const Home = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const getAllPosts = async () => {
    try {
      const res = await getData('/post');
      console.log('posts', res.data);
      setPosts(res.data);
    } catch (err) {
      Alert.alert('Some error occured,Try again later');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Filter
            open={modalVisible}
            setOpen={setModalVisible}
            setPosts={setPosts}
          />
        </View>
      </Modal>
      <Topbar navigation={navigation} title="Home" />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          paddingVertical: 5,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          paddingRight: 20,
          marginBottom: 10,
        }}>
        <Image
          source={FilterIcon}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e6e6e6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 30,
          paddingBottom: 30,
        }}
        contentContainerStyle={{alignItems: 'center'}}>
        {posts && posts?.length > 0 ? (
          <>
            {posts?.map((data, idx) => (
              <PostCard
                data={data}
                key={idx}
                setPosts={setPosts}
                posts={posts}
              />
            ))}
          </>
        ) : (
          <View
            style={{
              height: height - 300,
              alignItemsce: 'center',
              justifyContent: 'center',
            }}>
            <Text>No post yet</Text>
          </View>
        )}
        <View style={{marginTop: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
