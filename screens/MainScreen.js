import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Button, Text, Image} from 'react-native';
import ScanImg from './ScanImg';
import DisplayImages from './RetrieveImg/DisplayImages';
import Profile from './profile/Profile';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}>
      <Tab.Screen
        name="Images"
        component={DisplayImages}
        options={{
          showLabel: true,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/image-gallery.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'orange' : 'grey',
                }}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'grey',
                  fontWeight: 'bold',
                }}>
                Images
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanImg}
        options={{
          showLabel: true,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/camera.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'orange' : 'grey',
                }}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'grey',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Scan docs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          showLabel: true,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'orange' : 'grey',
                }}
              />
              <Text
                style={{
                  color: focused ? 'orange' : 'grey',
                  fontWeight: 'bold',
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
