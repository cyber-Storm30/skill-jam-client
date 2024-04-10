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
import {BASE_URI, getData, postData} from '../services/rootService';
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

const Filter = ({open, setOpen, setPosts}) => {
  const {width, height} = useWindowDimensions();
  const [categories, setCategories] = useState(items);
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
    const selectedCategories = categories.filter(
      item => item.isSelected === true,
    );
    console.log(selectedCategories);
    try {
      const res = await postData('/post/filter', {
        categories: selectedCategories,
      });
      if (res.statusCode === 200) {
        setPosts(res.data);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
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
            setOpen(false);
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
            title="Filter"
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
        <ButtonPrimary title="Filter data" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default Filter;
