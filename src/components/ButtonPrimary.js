import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useWindowDimensions} from 'react-native';

const ButtonPrimary = ({
  customWidth,
  customHeight,
  title,
  onPress,
  disabled,
  Logo,
  loading,
  response,
  borderRadius,
  backgroundColor,
  isDelete,
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View
      style={{
        width: customWidth ? customWidth : width,
        alignItems: 'center',
      }}>
      {isDelete === true ? (
        !disabled ? (
          <TouchableOpacity onPress={onPress}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: customWidth ? customWidth : width - 40,
                backgroundColor: 'white',
                height: customHeight ? customHeight : 52,
                borderRadius: borderRadius ? borderRadius : 12,
                border: 'none',
                backgroundColor: '#1eabac',
                borderWidth: 1,
                borderColor: '#262626',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Montserrat-Bold',
                }}>
                {!loading ? (
                  <View>
                    {!response ? (
                      <Text
                        style={{
                          color: '#FAFAFA',
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 14,
                        }}>
                        {title}
                      </Text>
                    ) : (
                      <VerifiedIcon />
                    )}
                  </View>
                ) : (
                  <ActivityIndicator size="small" color="#FAFAFA " />
                )}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableWithoutFeedback>
            <View
              style={{
                width: customWidth ? customWidth : width - 40,
                backgroundColor: 'white',
                height: customHeight ? customHeight : 52,
                borderRadius: borderRadius ? borderRadius : 12,
                border: 'none',
                backgroundColor: '#4D4D4D',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#262626',
              }}>
              <Text
                style={{
                  color: '#262626',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                }}>
                {title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      ) : (
        <>
          {!disabled ? (
            <TouchableOpacity onPress={onPress}>
              <View
                style={{
                  width: customWidth ? customWidth : width - 40,
                  backgroundColor: 'white',
                  height: customHeight ? customHeight : 52,
                  borderRadius: borderRadius ? borderRadius : 12,
                  border: 'none',
                  backgroundColor: backgroundColor
                    ? backgroundColor
                    : '#1eabac',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!loading ? (
                  <View>
                    <Text
                      style={{
                        color: '#FAFAFA',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                      }}>
                      {title}
                    </Text>
                  </View>
                ) : (
                  <ActivityIndicator size="small" color="#FAFAFA " />
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: customWidth ? customWidth : width - 40,
                  backgroundColor: 'white',
                  height: customHeight ? customHeight : 52,
                  borderRadius: borderRadius ? borderRadius : 12,
                  border: 'none',
                  backgroundColor: '#4D4D4D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#363638',
                }}>
                <Text
                  style={{
                    color: '#262626',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 14,
                  }}>
                  {title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </>
      )}
    </View>
  );
};

export default ButtonPrimary;
