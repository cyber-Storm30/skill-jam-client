import {View, Text} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckbox = ({
  toggleCheckBox,
  setToggleCheckBox,
  text,
  onValueChange,
}) => {
  return (
    <View style={{alignItems: 'center', flexDirection: 'row'}}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={onValueChange}
      />
      <Text style={{color: 'black'}}>{text}</Text>
    </View>
  );
};

export default CustomCheckbox;
