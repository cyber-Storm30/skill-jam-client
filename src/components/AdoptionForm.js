import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CrossIcon from '../../assets/cross.png';
import Input from './Input';
import ButtonPrimary from './ButtonPrimary';
import {postData} from '../services/rootService';
import {useSelector} from 'react-redux';

const AdoptionForm = ({open, setOpen, data}) => {
  const {width} = useWindowDimensions();
  const userDetails = useSelector(state => state.auth.userDetails);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isRent, setIsRent] = useState('');
  const [lPhone, setLphone] = useState();
  const [isPetFriendly, setIsPetFriendly] = useState('');
  const [isYard, setIsYard] = useState('');
  const [isFenced, setIsFenced] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [hoursAlone, setHoursAlone] = useState('');
  const [childrenAge, setChildrenAge] = useState('');
  const [otherPets, setOtherPets] = useState('');
  const [otherPetsAge, setOtherPetsAge] = useState('');
  const [otherPetsBreed, setOtherPetsBreed] = useState('');

  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setOpen(false);
  };
  const handleSubmitApplication = async () => {
    if (
      (name?.length > 0 &&
        address?.length > 0 &&
        city?.length > 0 &&
        zipCode?.length > 0 &&
        state?.length > 0 &&
        phone?.length > 0,
      email?.length > 0,
      isRent?.length > 0,
      isPetFriendly?.length > 0,
      isYard?.length > 0,
      activityLevel?.length > 0,
      hoursAlone?.length > 0,
      childrenAge?.length > 0,
      otherPets?.length > 0)
    ) {
      try {
        setLoading(true);
        const res = await postData(`/form`, {
          sender: userDetails?._id,
          receiver: data?.userId?._id,
          pet: data?._id,
          name,
          address,
          city,
          zipCode,
          state,
          phone,
          email,
          isRent,
          lPhone,
          isPetFriendly,
          isYard,
          isFenced,
          activityLevel,
          hoursAlone,
          childrenAge,
          otherPets,
          otherPetsAge,
          otherPetsBreed,
        });
        console.log(res);
        if (res.statusCode === 200) {
          Alert.alert('Succesfull', 'Adoption request is sent successfully', [
            {
              text: 'Ok',
              onPress: () => handleNavigation(),
              style: 'okay',
            },
            // {
            //   text: 'Cancel',
            //   onPress: () => console.log('cancel'),
            //   style: 'cancel',
            // },
          ]);
        } else {
          Alert.alert('Failed', 'Something went wrong. Try again later', [
            {
              text: 'Ok',
              onPress: () => handleNavigation(),
              style: 'okay',
            },
            // {
            //   text: 'Cancel',
            //   onPress: () => console.log('cancel'),
            //   style: 'cancel',
            // },
          ]);
        }
      } catch (err) {
        Alert.alert('Something went wrong,try again later');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Please fill all the fields first');
    }
  };

  return (
    <Modal transparent open={open}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginTop: 20, marginRight: 20}}
          onPress={() => {
            setOpen(false);
          }}>
          <Image source={CrossIcon} style={{width: 15, height: 15}} />
        </TouchableOpacity>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 24}}>
          Adoption Form
        </Text>
        <ScrollView
          style={{marginTop: 25}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Name"
              placeholder="Enter your name"
              onChange={val => {
                setName(val);
              }}
              name="name"
              value={name}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Address"
              placeholder="Enter your address"
              onChange={val => {
                setAddress(val);
              }}
              name="name"
              value={address}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="City"
              placeholder="Enter your city"
              onChange={val => {
                setCity(val);
              }}
              value={city}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="State"
              placeholder="Enter your state"
              onChange={val => {
                setState(val);
              }}
              value={state}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Zip code"
              placeholder="Enter your zip code"
              onChange={val => {
                setZipCode(val);
              }}
              value={zipCode}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Email"
              placeholder="Enter your email"
              onChange={val => {
                setEmail(val);
              }}
              value={email}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Phone"
              placeholder="Enter your phone"
              onChange={val => {
                setPhone(val);
              }}
              value={phone}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading=" Do you rent your home ?"
              placeholder="Answer in Yes or No"
              onChange={val => {
                setIsRent(val);
              }}
              value={isRent}
              backgroundColor="transparent"
              required
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="If yes provide your Landlord's phone number"
              placeholder="Answer in Yes or No"
              onChange={val => {
                setLphone(val);
              }}
              value={lPhone}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Is your location pet-friendly?"
              placeholder="Answer in Yes or No"
              onChange={val => {
                setIsPetFriendly(val);
              }}
              value={isPetFriendly}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Do you have a yard?"
              placeholder="Answer in Yes or No"
              onChange={val => {
                setIsYard(val);
              }}
              value={isYard}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Is your yard fenced?"
              placeholder="Answer in Yes or No"
              onChange={val => {
                setIsFenced(val);
              }}
              value={isFenced}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="How would you describe your activity level?"
              placeholder="Sedentary , Moderately Active or Very Active?"
              onChange={val => {
                setActivityLevel(val);
              }}
              value={activityLevel}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="How many hours will the animal be left alone?"
              placeholder="example: 2hr or 5hr"
              onChange={val => {
                setHoursAlone(val);
              }}
              value={hoursAlone}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Do you have children in your house?"
              placeholder="if yes list their ages"
              onChange={val => {
                setChildrenAge(val);
              }}
              value={childrenAge}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Do you have other pets in your household?"
              placeholder="if yes list their ages and breed below"
              onChange={val => {
                setOtherPets(val);
              }}
              value={otherPets}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Age"
              placeholder="example: 2yrs or 3yrs"
              onChange={val => {
                setOtherPetsAge(val);
              }}
              value={otherPetsAge}
              backgroundColor="transparent"
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              heading="Breed"
              placeholder="example: Pomeranian"
              onChange={val => {
                setOtherPetsBreed(val);
              }}
              value={otherPetsBreed}
              backgroundColor="transparent"
            />
          </View>
          <Text style={{width: width - 50, color: 'black'}}>
            I declare that the information provided in this application is true
            and accurate to the best of my knowledge. I understand that
            completing this form does not guarantee adoption and that the
            adoption process may include an interview, home visit, and reference
            checks.
          </Text>
          <View style={{marginBottom: 20, marginTop: 20}}>
            <ButtonPrimary
              title="Submit"
              onPress={handleSubmitApplication}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AdoptionForm;
