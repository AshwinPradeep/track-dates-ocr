import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import PhoneNumber from './screens/PhoneNumber';
import VerifyCode from './screens/VerifyCode';
import MainScreen from './screens/MainScreen';
import messaging from '@react-native-firebase/messaging';
import ScanImg from './screens/ScanImg';
import SignUp from './screens/SignUp/Signup';
import Profile from './screens/profile/Profile';
import DisplayExtractedData from './screens/DisplayExtractedData';
import DisplayDetailView from './screens/RetrieveImg/DisplayDetailView';
import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import HttpReqHandler from './RequestHandler/reqHandler';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();
    const userIdentity = useSelector(state => state.signUp.userId);

  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      const body = {
        token: token,
        userId: userIdentity
      }
      const fcmUrl = 'https://thawing-river-00445.herokuapp.com/api/register'
      const response = HttpReqHandler(fcmUrl,'POST',body,null)
      response.then(jsonRes => {
        console.log(jsonRes)
      })
      response.catch(error => console.log("error in converting json App.js",error))
    } catch (err) {
      console.log("error in fcm token url App.js")
  }

  useEffect(() => {
    sendFcmToken();
  }, []);

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PhoneNumber}></Stack.Screen>
        <Stack.Screen name="ScanImg" component={ScanImg}></Stack.Screen>
        <Stack.Screen name="VerifyCode" component={VerifyCode}></Stack.Screen>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
        <Stack.Screen
          name="DisplayExtractedData"
          component={DisplayExtractedData}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
        <Stack.Screen
          name="DisplayDetailView"
          component={DisplayDetailView}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
