import React from 'react';
import {View} from 'react-native';
import PersonalInfo from './PersonalInfo';
import LogoutComponent from '../LogoutComponent';
import ProfileImg from './ProfileImg';
import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  return (
    <View>
      <ProfileImg />
      <PersonalInfo />
      <LogoutComponent navigation={navigation} />
    </View>
  );
};

export default Profile;
