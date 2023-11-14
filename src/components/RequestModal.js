import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import CrossIcon from '../../assets/cross.png';
import React, {useState} from 'react';
import ButtonPrimary from './ButtonPrimary';
import {postData} from '../services/rootService';

const RequestModal = ({open, setOpen, data, navigation}) => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      const res = await postData('/form/accept/request/', {
        requestId: data?._id,
      });
      if (res.statusCode === 200) {
        setOpen(false);
        navigation.navigate('Home');
      }
    } catch (err) {
      Alert.alert('Network error,Try again later');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    setDeleteLoading(true);
    try {
      const res = await postData('/form/delete/request/', {
        requestId: data?._id,
      });
      if (res.statusCode === 200) {
        setOpen(false);
        navigation.navigate('Home');
      }
    } catch (err) {
      Alert.alert('Network error,Try again later');
    } finally {
      setDeleteLoading(false);
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
          Sender Details
        </Text>
        <ScrollView style={{marginTop: 25, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Name : <Text style={{color: 'black'}}>{data?.sender?.name}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Address : <Text style={{color: 'black'}}>{data?.address}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            City : <Text style={{color: 'black'}}>{data?.city}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            State : <Text style={{color: 'black'}}>{data?.state}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Zip Code : <Text style={{color: 'black'}}>{data?.zipCode}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Email : <Text style={{color: 'black'}}>{data?.email}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Phone : <Text style={{color: 'black'}}>{data?.phone}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Address : <Text style={{color: 'black'}}>{data?.address}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Is house rented or not? :{' '}
            <Text style={{color: 'black'}}>{data?.isRentHome}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Landlord Phone :{' '}
            <Text style={{color: 'black'}}>{data?.landlordNumber}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Is the receidence pet friendly? :{' '}
            <Text style={{color: 'black'}}>{data?.isPetFriendly}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Does house have a yard? :{' '}
            <Text style={{color: 'black'}}>{data?.isYard}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Is the yard fenced? :{' '}
            <Text style={{color: 'black'}}>{data?.isYardFenced}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Activity Level :{' '}
            <Text style={{color: 'black'}}>{data?.activityLevel}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            How many hours will the pet be alone? :{' '}
            <Text style={{color: 'black'}}>{data?.hourAlonePet}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Children's age :{' '}
            <Text style={{color: 'black'}}>{data?.childrenAge}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Does he/she own any other pet? :{' '}
            <Text style={{color: 'black'}}>{data?.isOtherPet}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Age of the pet :{' '}
            <Text style={{color: 'black'}}>{data?.otherPetAge}</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Breed of the pet :{' '}
            <Text style={{color: 'black'}}>{data?.otherPetBreed}</Text>
          </Text>
          {data?.requestStatus === 'ACCEPTED' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                width: width,
                justifyContent: 'center',
              }}>
              <View style={{marginRight: 10}}>
                <ButtonPrimary
                  customWidth={width - 100}
                  title="Request has been accepted"
                />
              </View>
            </View>
          )}
          {data?.requestStatus === 'PENDING' && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <View style={{marginRight: 10}}>
                <ButtonPrimary
                  customWidth={width / 2.5}
                  title="Accept request"
                  onPress={handleAcceptRequest}
                  loading={loading}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <ButtonPrimary
                  onPress={handleDeleteRequest}
                  loading={deleteLoading}
                  customWidth={width / 2.5}
                  backgroundColor="#ff0000"
                  title="Delete request"
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default RequestModal;
