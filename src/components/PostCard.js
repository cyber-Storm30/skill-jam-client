import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Account from '../../assets/account.png';
import {BASE_URI} from '../services/rootService';
import VideoPlayer from 'react-native-video-player';
import LikeIcon from '../../assets/like.png';
import LikedIcon from '../../assets/liked.png';
import CommentIcon from '../../assets/comment.png';
import ShareIcon from '../../assets/share.png';
import LinkIcon from '../../assets/link.png';
import ThreeDotIcon from '../../assets/threeDot.png';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';
import {useSelector} from 'react-redux';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import CommentSection from './CommentSection';

const PostCard = ({data, showIcon, setPosts, posts, navigation}) => {
  const {width, height} = useWindowDimensions();
  const refRBSheet = useRef();
  const userDetails = useSelector(state => state.auth.userDetails);
  const [isLiked, setIsLiked] = useState(
    data?.likes?.includes(userDetails?._id),
  );
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const userHasLiked = data?.likes?.includes(userDetails?._id);
    setIsLiked(userHasLiked);
    setLikeCount(data?.likes.length);
  }, [data?.likes, userDetails]);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
    try {
      const res = await axios.post(`${BASE_URI}/post/like`, {
        userId: userDetails?._id,
        postId: data?._id,
      });
      console.log(res);
      if (res.status === 500) {
        Alert.alert('Something went wrong,try again later');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${BASE_URI}/post/${data?._id}`);
      console.log(res);
      if (res.status === 200) {
        const filteredPosts = posts.filter((d, idx) => {
          return d._id !== data._id;
        });
        setPosts(filteredPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        width: width - 40,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        backgroundColor: 'white',
        paddingBottom: 20,
      }}>
      <RBSheet
        height={height - 200}
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            // backgroundColor: '#242424',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 135,
            backgroundColor: '#636366',
          },
        }}>
        <CommentSection id={data?._id} width={width} height={height - 200} />
      </RBSheet>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {data?.userId?.image?.length <= 0 ? (
            <Image
              source={Account}
              style={{width: 40, height: 40, borderRadius: 30}}
            />
          ) : (
            <Image
              source={{uri: `${BASE_URI}/files/${data?.userId.image}`}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
              }}
            />
          )}
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 500}}>
              {data?.userId.name}
            </Text>
            <Text style={{fontSize: 12, color: 'black', fontWeight: 400}}>
              {data?.userId.job}
            </Text>
          </View>
        </View>
        {showIcon && showIcon === 'true' ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => {
                navigation.navigate('AddPost', {
                  data: data,
                });
              }}
              hitSlop={10}>
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
              style={{}}>
              <Image source={Delete} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{marginTop: 10}}>
        {data?.body.length > 0 && (
          <Text style={{color: '#141414', marginBottom: 5}}>{data.body}</Text>
        )}
        {data?.image && (
          <Image
            source={{uri: `${BASE_URI}/files/${data?.image}`}}
            style={{width: '100%', height: 200, borderRadius: 12}}
          />
        )}
        {data?.video && (
          <VideoPlayer
            video={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginTop: 20,
            marginBottom: 5,
            alignItems: 'center',
          }}>
          {data?.categories.map((cat, idx) => (
            <>
              {cat.isSelected && (
                <TouchableOpacity
                  key={idx}
                  style={{
                    marginRight: 10,
                    marginBottom: 5,
                    backgroundColor: '#387ADF',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 12,
                  }}>
                  <Text style={{color: 'white'}}>{cat.name}</Text>
                </TouchableOpacity>
              )}
            </>
          ))}
        </View>
        {data?.pdfLink && (
          <TouchableOpacity
            style={{
              width: 80,
              height: 23,
              // backgroundColor: '#50C4ED',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={LinkIcon}
              style={{width: 20, height: 20, marginRight: 3}}
            />
            <Text style={{color: '#141414', fontWeight: 500, fontSize: 12}}>
              PDF Link
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            paddingLeft: 5,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={handleLike}
            style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              source={isLiked ? LikedIcon : LikeIcon}
              style={{width: 25, height: 25}}
            />
            <Text style={{color: 'black', marginLeft: 5}}>{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image source={CommentIcon} style={{width: 25, height: 25}} />
            <Text style={{color: 'black', marginLeft: 5}}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image source={ShareIcon} style={{width: 25, height: 25}} />
            <Text style={{color: 'black', marginLeft: 5}}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
