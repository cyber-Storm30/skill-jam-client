import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import React, {Profiler} from 'react';
import {View, Text, Easing, Platform} from 'react-native';
import AddPet from '../screens/AddPet';
import AnimalInsurance from '../screens/AnimalInsurance';
import EditPet from '../screens/EditPet';
import EditProfile from '../screens/EditProfile';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import Onboarding from '../screens/Onboarding';
import PetDetails from '../screens/PetDetails';
import PetHealth from '../screens/PetHealth';
import Profile from '../screens/Profile';
import ReceivedRequests from '../screens/ReceivedRequests';
import ResetPassword from '../screens/ResetPassword';
import Reviews from '../screens/Reviews';
import SentRequests from '../screens/SentRequests';
import Signup from '../screens/Signup';
import YourPets from '../screens/YourPets';

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
        <Stack.Screen name="PetDetails" component={PetDetails} />
        <Stack.Screen name="PetHealth" component={PetHealth} />
        <Stack.Screen name="Addpet" component={AddPet} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="AnimalInsurance" component={AnimalInsurance} />
        <Stack.Screen name="ReceivedRequests" component={ReceivedRequests} />
        <Stack.Screen name="SentRequests" component={SentRequests} />
        <Stack.Screen name="YourPets" component={YourPets} />
        <Stack.Screen name="EditPet" component={EditPet} />
        <Stack.Screen name="Reviews" component={Reviews} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
