import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URI, getData, postData} from '../services/rootService';
import Account from '../../assets/account.png';
import Send from '../../assets/send.png';
import moment from 'moment';
import {useSelector} from 'react-redux';

const CommentSection = ({id, width, height}) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const userDetails = useSelector(state => state.auth.userDetails);

  useEffect(() => {
    const getComments = async () => {
      try {
        let data;
        data = await getData(`/post/comment/${id}`);
        console.log(data.data);
        setComments(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, []);

  const handleSubmit = async () => {
    try {
      let data;
      data = await postData(`/post/comment`, {
        postId: id,
        userId: userDetails?._id,
        body: comment,
      });
      console.log(data);
      if (data.statusCode === 200) {
        setComments([data.data, ...comments]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setComment('');
    }
  };
  return (
    <View style={{paddingTop: 20, height: height}}>
      <Text
        style={{
          fontSize: 18,
          color: '#141414',
          fontWeight: 600,
          textAlign: 'center',
          paddingBottom: 20,
        }}>
        Comments
      </Text>
      <ScrollView style={{height: '80%', paddingHorizontal: 20}}>
        {comments?.length > 0 ? (
          <>
            {comments?.map((data, idx) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
                key={idx}>
                {data?.userId ? (
                  <>
                    {data?.userId?.image.length <= 0 ? (
                      <Image
                        source={Account}
                        style={{width: 30, height: 30, borderRadius: 30}}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: `${BASE_URI}/files/${data?.userId.image}`,
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <Image
                    source={Account}
                    style={{width: 30, height: 30, borderRadius: 30}}
                  />
                )}

                <View style={{marginLeft: 5}}>
                  <Text style={{fontSize: 14, color: 'black', fontWeight: 500}}>
                    {data?.userId !== null ? data?.userId.name : 'Unknown User'}
                    {'  '}
                    <Text style={{color: 'gray', fontSize: 10}}>
                      {moment(data?.createdAt).fromNow()}
                    </Text>
                  </Text>
                  <Text style={{fontSize: 14, color: 'black', fontWeight: 500}}>
                    {data?.body}
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View
            style={{
              width: '100%',
              height: height - 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#141414'}}>No Comments yet</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width,
          backgroundColor: 'lightgray',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <TextInput
          value={comment}
          placeholder="Type here"
          placeholderTextColor="#141414"
          style={{color: '#141414'}}
          onChangeText={val => {
            setComment(val);
          }}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={Send} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;
