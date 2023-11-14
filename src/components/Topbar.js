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

const Topbar = ({navigation, title}) => {
  const {width} = useWindowDimensions();
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

      <Text style={{fontSize: 16, color: '#1eabac'}}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          source={Account}
          style={{width: 30, height: 30, borderRadius: 50}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;
