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

const Filter = ({
  open,
  setOpen,
  setPosts,
  items,
  setFilterData,
  filterData,
}) => {
  const {width, height} = useWindowDimensions();
  const [categories, setCategories] = useState(
    filterData?.length > 0 ? filterData : items,
  );
  const [disabled, setDisabled] = useState(true);
  const userDetails = useSelector(state => state.auth.userDetails);
  const [loading, setLoading] = useState(false);

  console.log('1', categories);
  console.log('2', filterData);
  console.log('3', items);

  const handleSelectCategory = data => {
    const newList = categories?.map((item, idx) => {
      if (item.id === data.id) {
        return {...item, isSelected: !item.isSelected};
      } else {
        return item;
      }
    });
    setCategories(newList);
    setFilterData(newList);
  };

  const handleSubmit = async () => {
    try {
      const res = await postData('/post/filter', {
        categories: categories,
      });
      if (res.statusCode === 200) {
        setFilterData(categories);
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
