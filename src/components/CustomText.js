import {View, Text} from 'react-native';
import React from 'react';

const CustomText = props => {
  const {title, ...other} = props;
  return <Text style={{...other}}>{title}</Text>;
};

export default CustomText;
