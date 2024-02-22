import React from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signUpActions} from '../../store/index';

const SignUpInputs = () => {
  console.log(SignUpInputs);
  const dispatch = useDispatch();

  const handleEmail = em => {
    dispatch(signUpActions.setEmail(em));
  };

  const handlephoneNum = ph => {
    dispatch(signUpActions.setphNum(ph));
  };

  const handlePassword = password => {
    dispatch(signUpActions.setPassword(password));
  };

  const handleName = name => {
    dispatch(signUpActions.setName(name));
  };

  return (
    <View>
      <Text style={styles.header}>Signup</Text>
      <TextInput
        autoFocus
        onChangeText={email => handleEmail(email)}
        placeholder="email"
        placeholderTextColor="grey"
        style={styles.input}></TextInput>

      <TextInput
        placeholder="mobilenum"
        maxLength={10}
        onChangeText={ph => handlephoneNum(ph)}
        placeholderTextColor="grey"
        style={styles.input}></TextInput>

      <TextInput
        placeholder="name"
        onChangeText={name => handleName(name)}
        placeholderTextColor="grey"
        style={styles.input}></TextInput>

      {/* <TextInput
        secureTextEntry={true}
        onChangeText={password => handlePassword(password)}
        placeholder="Password"
        style={styles.input}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  //Check project repo for styles
  input: {
    margin: 10,
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  header: {
    textAlign: 'center',
    fontSize: 30,
    margin: 7,
    fontWeight: 'bold',
  },
});

export default SignUpInputs;
