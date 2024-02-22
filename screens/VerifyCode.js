import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {optActions} from '../store';
import {LogBox} from 'react-native';
import MainScreen from './MainScreen';

export default function OTP({navigation, route}) {
  const dispatch = useDispatch();
  const code = useSelector(state => state.otp.code);
  const confirm = useSelector(state => state.otp.confirm);

  useEffect(() => {
    dispatch(optActions.setCode(''));
  }, []);

  const handleCode = code => {
    dispatch(optActions.setCode(code));
  };

  async function confirmVerificationCode(code) {
    try {
      console.log('code' + code);
      await confirm.confirm(code);
      dispatch(optActions.setIsLogged());
      navigation.navigate('MainScreen');
    } catch (error) {
      alert('Invalid code');
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter OTP</Text>
      <TextInput
        autoFocus
        value={code}
        onChangeText={code => handleCode(code)}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title="Confirm OTP"
        onPress={() => confirmVerificationCode(code)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
    color: 'black',
  },
  text: {
    fontSize: 25,
  },
});
