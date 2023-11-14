import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import Topbar from '../components/Topbar';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {postData} from '../services/rootService';
import {useSelector} from 'react-redux';

const AddPet = ({navigation}) => {
  const userDetails = useSelector(state => state.auth.userDetails);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [disease, setDisease] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitPet = async () => {
    setLoading(true);
    try {
      const res = await postData('/pet', {
        userId: userDetails?._id,
        name,
        breed,
        sex,
        age,
        weight,
        disease,
        image,
        desc,
      });
      console.log(res);
      if (res.statusCode === 200) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Something went wrong, try again later');
      }
    } catch (err) {
      Alert.alert('Something went wrong, try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Topbar navigation={navigation} title="Add pet" />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#e6e6e6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 30,
          paddingBottom: 30,
        }}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Name"
            placeholder="Enter your pet's name"
            onChange={val => {
              setName(val);
            }}
            name="name"
            value={name}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Breed"
            placeholder="Enter your pet's breed"
            onChange={val => {
              setBreed(val);
            }}
            name="name"
            value={breed}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Sex"
            placeholder="Enter your pet's sex"
            onChange={val => {
              setSex(val);
            }}
            name="sex"
            value={sex}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Age"
            placeholder="Enter your pet's age"
            onChange={val => {
              setAge(val);
            }}
            name="age"
            value={age}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Weight"
            placeholder="Enter your pet's weight in kg"
            onChange={val => {
              setWeight(val);
            }}
            name="weight"
            value={weight}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Disease"
            placeholder="Enter your pet's disease (if no then enter NA)"
            onChange={val => {
              setDisease(val);
            }}
            name="disease"
            value={disease}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Image"
            placeholder="Enter your pet's image"
            onChange={val => {
              setImage(val);
            }}
            name="image"
            value={image}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Input
            heading="Description"
            placeholder="Write some details about your pet"
            onChange={val => {
              setDesc(val);
            }}
            name="desc"
            value={desc}
            backgroundColor="transparent"
            required
          />
        </View>
        <View style={{marginBottom: 60}}>
          <ButtonPrimary
            title="Submit"
            loading={loading}
            onPress={handleSubmitPet}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPet;
