import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import BackButton from '../../assets/back.png';
import React, {useEffect, useState} from 'react';
import CustomText from '../components/CustomText';
import ButtonPrimary from '../components/ButtonPrimary';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BASE_URI} from '../services/rootService';
import {useSelector} from 'react-redux';
import axios from 'axios';

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

const AddCategories = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const [categories, setCategories] = useState(
    route.params.categories ? route.params.categories : items,
  );
  const [disabled, setDisabled] = useState(true);
  const userDetails = useSelector(state => state.auth.userDetails);
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = data => {
    const newList = categories?.map((item, idx) => {
      if (item.id === data.id) {
        return {...item, isSelected: !item.isSelected};
      } else {
        return item;
      }
    });
    setCategories(newList);
  };

  const handleSubmit = async () => {
    const {image, imageName, video, videoName, pdfLink, pdfName, body} =
      route.params;

    console.log(route.params);
    if (route.params.isEdit) {
      // console.log(route.params);
      // const newImage = route.params.image.split('files/')[1];
      // console.log(newImage);
      try {
        const res = await axios.patch(`${BASE_URI}/post`, {
          body,
          categories: categories,
          postId: route.params.postId,
        });
        if (res.status === 200) {
          navigation.navigate('Home');
        }
      } catch (err) {
        Alert.alert('Something went wrong');
      }
    } else {
      if (image.length > 0) {
        try {
          const newName = Date.now() + ' - ' + imageName;
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: newName,
          });
          const URL = `${BASE_URI}/upload`;
          const res = await fetch(URL, {
            method: 'post',
            body: formData,
            //   headers: {
            //     'Content-Type': 'multipart/form-data',
            //   },
          });
          console.log(res);
          if (res.status === 200) {
            try {
              const res = await axios.post(`${BASE_URI}/post`, {
                userId: userDetails._id,
                body,
                categories: categories,
                image: newName,
              });
              console.log(res);
              if (res.status === 200) {
                console.log('Post done', res);
                navigation.navigate('Home');
              }
            } catch (err) {
              console.log(err);
              Alert.alert('Some error occured');
            } finally {
              setLoading(false);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else if (video.length > 0) {
        try {
          const newName = Date.now() + ' - ' + videoName;
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: video,
            type: 'video/mp4',
            name: newName,
          });
          const URL = `${BASE_URI}/upload`;
          const res = await fetch(URL, {
            method: 'post',
            body: formData,
          });
          if (res.status === 200) {
            try {
              const res = await axios.post(`${BASE_URI}/post`, {
                userId: userDetails._id,
                body,
                categories: categories,
                video: newName,
              });
              console.log(res);
              if (res.status === 200) {
                console.log('Post done', res);
                navigation.navigate('Home');
              }
            } catch (err) {
              console.log(err);
              Alert.alert('Some error occured');
            } finally {
              setLoading(false);
            }
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      } else if (pdfLink.length > 0) {
        try {
          const newName = Date.now() + ' - ' + pdfName;
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: pdfLink,
            type: 'application/pdf',
            name: newName,
          });
          const URL = `${BASE_URI}/upload`;
          const res = await fetch(URL, {
            method: 'post',
            body: formData,
          });
          console.log('pdf', res);
          if (res.status === 200) {
            try {
              const res = await axios.post(`${BASE_URI}/post`, {
                userId: userDetails._id,
                body,
                categories: categories,
                pdfLink: newName,
              });
              console.log('Post done', res);
              if (res.status === 200) {
                navigation.navigate('Home');
              }
            } catch (err) {
              console.log(err);
              Alert.alert('Some error occured');
            } finally {
              setLoading(false);
            }
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (categories.some(item => item.isSelected === true)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [categories]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            left: 10,
            zIndex: 1000,
          }}
          onPress={() => {
            navigation.goBack();
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
            title="Select Categories"
            color="#50C4ED"
            fontSize={24}
            fontWeight={600}
            marginBottom={30}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: width,
            paddingHorizontal: 20,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {categories?.map((data, idx) => (
            <TouchableOpacity
              key={data?.id}
              onPress={() => {
                handleSelectCategory(data);
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor:
                  data?.isSelected === false ? 'transparent' : '#50C4ED',
                borderWidth: 1,
                borderRadius: 12,
                borderColor: data?.isSelected === false ? 'gray' : '#50C4ED',
                padding: 6,
              }}>
              <Text>{data.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ButtonPrimary
          title="Submit"
          onPress={handleSubmit}
          disabled={disabled}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

export default AddCategories;
