import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import React, {Profiler} from 'react';
import {View, Text, Easing, Platform} from 'react-native';
import AddPost from '../screens/AddPost';
import EditProfile from '../screens/EditProfile';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import ResetPassword from '../screens/ResetPassword';
import Reviews from '../screens/Reviews';
import Signup from '../screens/Signup';
import AddCategories from '../screens/AddCategories';

const Stack = createNativeStackNavigator();

const Navigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
        initialRouteName={props.inititalScreen}>
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{
            gestureEnabled: Platform.OS === 'ios' ? false : true,
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="Category" component={AddCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
