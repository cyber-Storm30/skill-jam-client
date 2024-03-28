import {
  View,
  Text,
  useWindowDimensions,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Cross from '../../assets/cross.png';
import PawIcon from '../../assets/paw.png';
import Health from '../../assets/health.png';
import AddIcon from '../../assets/add.png';
import Bell from '../../assets/bell.png';
import Account from '../../assets/account.png';
import Pet from '../../assets/pet.png';
import Star from '../../assets/review.png';
import Logout from '../../assets/logout.png';

import Insurance from '../../assets/insurance.png';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/auth';

const Drawer = ({open, setOpen, navigation}) => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const userDetails = useSelector(state => state.auth.userDetails);

  return (
    <Modal
      transparent
      open={open}
      style={{
        transform: 'translate(-50%, -50%)',
        opacity: '20%',
        transition: '.5s',
      }}>
      <View
        style={{
          width: width / 1.6,
          height: height,
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: '#50C4ED',
          top: 0,
          paddingTop: 20,
          paddingLeft: 20,
          transition: '2s',
        }}>
        <TouchableOpacity
          hitSlop={10}
          style={{width: '100%', alignItems: 'flex-end', paddingRight: 20}}
          onPress={() => {
            setOpen(false);
          }}>
          <Image source={Cross} style={{width: 15, height: 15}} />
        </TouchableOpacity>
        <Image
          source={Account}
          style={{width: 50, height: 50, borderRadius: 30}}
        />
        <Text style={{color: '#ffffff', fontSize: 16, marginTop: 10}}>
          {userDetails?.name}
        </Text>
        <View style={{marginTop: 50}}>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              navigation.navigate('Home');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={PawIcon}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>Adoption</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              navigation.navigate('PetHealth');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={Health}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>Animal health</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              navigation.navigate('Addpet');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={AddIcon}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>Add pet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('YourPets');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={Pet}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>Your pets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              navigation.navigate('AnimalInsurance');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={Insurance}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>
              Animal Insurance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              navigation.navigate('Reviews');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={Star}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 18, color: '#ffffff'}}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
              navigation.navigate('Launch');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}>
            <Image
              source={Logout}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={{fontSize: 17, color: 'red'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Drawer;
