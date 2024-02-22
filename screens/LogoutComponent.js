import React from 'react';
import {View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

const LogoutComponent = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <Button
        color={'orange'}
        title="Logout"
        onPress={() => {
          auth().signOut();
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default LogoutComponent;
