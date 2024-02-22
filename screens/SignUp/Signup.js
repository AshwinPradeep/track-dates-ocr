import SignUpInputs from './SignupInputs';
import SignupBtn from './SignupBtn';
import React from 'react';
import {View} from 'react-native';

const SignUp = ({navigation}) => {
  return (
    <View>
      <SignUpInputs />
      <SignupBtn navigation={navigation} />
    </View>
  );
};

export default SignUp;
