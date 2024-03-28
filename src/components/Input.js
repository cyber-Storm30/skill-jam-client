import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const Input = props => {
  const [focused, setFocused] = useState(false);
  const [lowerLimit, setLowerLimit] = useState(false);
  const {
    otherError,
    name,
    error,
    loginError,
    setError,
    widthProp,
    ...inputProps
  } = props;

  const {width} = useWindowDimensions();

  useEffect(() => {
    if (loginError) {
      setError(true);
    }
    if (setError && inputProps?.value.length === 0) {
      setError(false);
    }
  }, [loginError]);

  const validate = (value, name) => {
    if (name === 'phonenumber') {
      let pattern = /^[5-9][0-9]{9}$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'password') {
      let pattern =
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'confirmpassword') {
      if (inputProps?.password !== inputProps?.value) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'fullName') {
      let pattern = /^[a-zA-Z ]*$/;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'email') {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!pattern.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    } else if (name === 'projectTitle') {
      if (value.length < 3) {
        setError(true);
        setLowerLimit(true);
      } else {
        setError(false);
        setLowerLimit(false);
      }
    }
  };

  const handleBlur = e => {
    if (inputProps?.value?.length !== 0) {
      {
        setError && validate(inputProps.value, name);
      }
    }
    if (inputProps?.value?.length === 0) {
    }
    setFocused(false);
  };

  const handleFocus = e => {
    setFocused(true);
  };

  return (
    <View style={{width: widthProp ? widthProp : width - 40}}>
      {!inputProps.disableInputHeading && (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...inputProps.headingStyles,
              color: inputProps.error
                ? 'red'
                : inputProps?.headingStyles?.color
                ? inputProps?.headingStyles?.color
                : '#000',
              marginRight: 5,
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
            }}>
            {inputProps.heading}
          </Text>
          {inputProps.required && <Text style={{color: '#50C4ED'}}>*</Text>}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 50,
          backgroundColor: inputProps.backgroundColor
            ? inputProps.backgroundColor
            : '#252525',
          color: '#000',
          borderRadius: 12,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 8,
          borderWidth: 1,
          borderColor: error ? 'red' : '#141414',
        }}>
        <TextInput
          name={name}
          value={inputProps.value}
          onChangeText={inputProps.onChange}
          placeholder={inputProps.placeholder}
          onBlur={handleBlur}
          onFocus={inputProps.onFocus ? inputProps.onFocus : handleFocus}
          style={{
            color: '#000',
            width: inputProps?.setShowPassword ? '90%' : '100%',
            fontFamily: 'Montserrat-Regular',
          }}
          secureTextEntry={inputProps.secureTextEntry}
          placeholderTextColor="#8E8E93"
          keyboardType={inputProps.keyboardType}
          maxLength={inputProps.maxLength}
          editable={inputProps.disable}
        />
        {inputProps?.setShowPassword && (
          <TouchableOpacity
            hitSlop={{top: 25, bottom: 25, left: 20, right: 15}}
            style={{
              padding: 10,
              marginRight: 10,
            }}
            onPress={() => {
              inputProps?.setShowPassword(prev => !prev);
            }}>
            {props?.icon}
          </TouchableOpacity>
        )}
      </View>
      {focused && !error && inputProps.helperText ? (
        <Text
          style={{
            color: '#ABB0AE',
            fontFamily: 'Montserrat-Regular',
            marginTop: 7,
          }}>
          {inputProps.helperText}
        </Text>
      ) : null}
      {!loginError && (
        <>
          {error && !props.multiErrorMessage ? (
            <Text style={styles.text}>
              {lowerLimit
                ? inputProps.lowerLimitErrorMessage
                : inputProps.errorMessage}
            </Text>
          ) : null}
          {error &&
            props.multiErrorMessage?.map((data, key) => (
              <Text style={styles.text} key={key}>
                {data}
              </Text>
            ))}
        </>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {},
  input: {},
  text: {
    color: 'red',
    textAlign: 'left',
    fontFamily: 'Montserrat-Regular',
    marginTop: 7,
  },
});
