import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Account from '../../assets/account.png';
import Menu from '../../assets/menu.png';
import Drawer from '../components/Drawer.js';
import {useSelector} from 'react-redux';
import {BASE_URI} from '../services/rootService';

const Topbar = ({navigation, title}) => {
  const {width} = useWindowDimensions();
  const userDetails = useSelector(state => state.auth.userDetails);
  const [open, setOpen] = useState(false);
  const toogleDrawer = () => {
    setOpen(!open);
  };
  return (
    <View
      style={{
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 80,
        alignItems: 'center',
      }}>
      {open && <Drawer setOpen={setOpen} navigation={navigation} />}
      <TouchableOpacity onPress={toogleDrawer}>
        <Image source={Menu} style={{width: 20, height: 25}} />
      </TouchableOpacity>

      <Text style={{fontSize: 16, color: '#50C4ED'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        {userDetails?.image?.length <= 0 ? (
          <Image
            source={Account}
            style={{width: 50, height: 50, borderRadius: 30}}
          />
        ) : (
          <Image
            source={{uri: `${BASE_URI}/files/${userDetails.image}`}}
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;
