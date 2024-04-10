import React, {useEffect, useState} from 'react';
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
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import VideoPlayer from 'react-native-video-player';
import CustomText from '../components/CustomText';
import ButtonPrimary from '../components/ButtonPrimary';
import Input from '../components/Input';
import BackButton from '../../assets/back.png';
import DocumentPicker from 'react-native-document-picker';
import Textarea from 'react-native-textarea';
import {BASE_URI} from '../services/rootService';

const PostForm = ({navigation, route}) => {
  var data;
  if (route.params) {
    data = route?.params.data;
  }

  console.log(data);

  const {width, height} = useWindowDimensions();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState(data?.body.length > 0 ? data?.body : '');
  const [image, setImage] = useState(
    data?.image.length > 0 ? `${BASE_URI}/files/${data?.image}` : '',
  );
  const [imageName, setImageName] = useState('');
  const [video, setVideo] = useState('');
  const [videoName, setVideoName] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [categories, setCategories] = useState([]);

  const items = [
    {
      id: 1,
      name: 'Technology & Innovation',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Creative Arts',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Personal Development',
      isSelected: false,
    },
    {
      id: 4,
      name: 'Fitness & Wellness',
      isSelected: false,
    },
    {
      id: 5,
      name: 'Entrepreneurship & Business',
      isSelected: false,
    },
    {
      id: 6,
      name: 'Academic Support',
      isSelected: false,
    },
    {
      id: 7,
      name: 'Career Development',
      isSelected: false,
    },
    {
      id: 8,
      name: 'Lifestyle & Hobbies',
      isSelected: false,
    },
    {
      id: 9,
      name: 'Health & Nutrition',
      isSelected: false,
    },
    {
      id: 10,
      name: 'Environment & Sustainability',
      isSelected: false,
    },
    {
      id: 11,
      name: 'Language Learning',
      isSelected: false,
    },
    {
      id: 12,
      name: 'Travel & Adventure',
      isSelected: false,
    },
  ];

  const onSelectedItemsChange = selectedItems => {
    setCategories(selectedItems);
  };

  const handleNext = () => {
    navigation.navigate('Category', {
      image,
      imageName,
      video,
      videoName,
      pdfLink,
      pdfName,
      body,
      isEdit: true,
      postId: data?._id,
      categories: data?.categories,
    });
  };

  const handlePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.video,
        ],
        copyTo: 'cachesDirectory',
      });

      if (res.type === 'image/jpeg') {
        console.log(res);
        setImage(res.fileCopyUri);
        setVideo('');
        setPdfLink('');
        setImageName(res.name);
      } else if (res.type === 'video/mp4') {
        setVideo(res.fileCopyUri);
        setImage('');
        setPdfLink('');
        setVideoName(res.name);
      } else {
        console.log(res);
        setPdfLink(res.fileCopyUri);
        setImage('');
        setVideo('');
        setPdfName(res.name);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled from single doc picker');
      } else {
        console('Unknown Error: ' + JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    if (image || video || pdfLink) {
      if (body) {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [image, video, pdfLink, body]);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 15,
          left: 10,
          zIndex: 1000,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image
          source={BackButton}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: width,
          paddingTop: 50,
          paddingHorizontal: 20,
        }}>
        <CustomText
          title={data ? 'Update post' : 'Upload post'}
          color="#50C4ED"
          fontSize={24}
          fontWeight={600}
          marginBottom={30}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          width: width,
          alignItems: 'center',
        }}>
        {!data && (
          <View style={{marginBottom: 20}}>
            <ButtonPrimary
              title="Upload video or image or pdf"
              onPress={handlePicker}
            />
          </View>
        )}
        {image && (
          <Image
            source={{uri: image}}
            style={{
              width: width - 40,
              height: 200,
              marginBottom: 20,
            }}
          />
        )}
        {video && (
          <VideoPlayer
            video={{
              uri: video,
            }}
            videoWidth={width}
            videoHeight={200}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
        )}

        <View style={{marginBottom: 10, width: width - 40, marginTop: 20}}>
          <Text
            style={{
              color: '#000',
              marginRight: 5,
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginBottom: 6,
            }}>
            Body {<Text style={{color: '#50C4ED'}}>*</Text>}
          </Text>
          <TextInput
            placeholder="Enter your description..."
            multiline={true}
            textAlignVertical="top"
            numberOfLines={10}
            onChangeText={val => setBody(val)}
            value={body}
            placeholderTextColor="gray"
            backgroundColor="transparent"
            required
            style={{
              color: '#000',
              fontFamily: 'Montserrat-Regular',
              backgroundColor: 'transparent',
              borderRadius: 12,
              borderWidth: 1,
              // borderColor: error ? 'red' : focused ? '#50C4ED' : '##50C4ED20',
            }}
          />
        </View>
        <ButtonPrimary
          title="Next"
          onPress={handleNext}
          disabled={disabled}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default PostForm;
