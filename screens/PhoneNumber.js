import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {optActions, signUpActions} from '../store';
import {VerifyCode} from './screens';
import auth from '@react-native-firebase/auth';
import HttpReqHandler from '../RequestHandler/reqHandler';

export default function PhoneNumber({navigation}) {
  const dispatch = useDispatch();
  const phn = useSelector(state => state.otp.phoneNum);
  const isRegistered = useSelector(state => state.signUp.isRegistered);
  const handlePhoneNumber = ph => {
    console.log(ph + 'hiii');
    dispatch(optActions.setphNum(ph));
    dispatch(signUpActions.setphNum(ph));
  };

  const checkUserSignedUp = async phNum => {
    if (phNum.length != 10) {
      alert('WRONG PHONE NUMBER');
      return;
    }

    console.log('phNum', phNum);
    const getUsersUrl =
      'https://thawing-river-00445.herokuapp.com/api/user/getuser';
    const response = HttpReqHandler(getUsersUrl, 'GET', null, null);
    response.then(jsonResponse => {
      jsonResponse.map(user => {
        if (phNum == user.phone) {
          console.log(user.phone);
          dispatch(signUpActions.setIsRegistered());
          signIn(phNum);
        }
      });
    });

    response.catch(err => console.log('api error in phoneNumber.js', err));
    dispatch(signUpActions.setIsRegistered());
  };

  async function signIn(phoneNumber) {
    try {
      const validPh = '+91' + phoneNumber;

      console.log('*****');
      const confirmation = await auth().signInWithPhoneNumber(validPh);
      dispatch(optActions.setConfirmation(confirmation));
      navigation.navigate('VerifyCode');
    } catch (error) {
      console.log('error in phone number');
      alert('Check your number');
    }
  }

  return (
    <View style={styles.screen}>
      <View>
        <Text style={styles.header1}>FREE</Text>
        <Text style={styles.header2}>Save Important Dates!</Text>
        <Text style={styles.header3}>
          Keep everything in one spot from passport to mixie warranty and we
          will never let you to forget
        </Text>
      </View>

      <Text style={styles.text}>
        To get started ,please enter your {'\n'} <Text>mobile number</Text>
      </Text>

      <TextInput
        autoFocus
        maxLength={10}
        style={styles.input}
        onChangeText={ph => handlePhoneNumber(ph)}
      />

      {!isRegistered && (
        <Text
          style={{
            color: 'red',
            marginTop: 15,
            fontSize: 18,
            textAlign: 'center',
          }}>
          Please Sign Up First!!!
        </Text>
      )}

      <View style={styles.btn}>
        <Button title="Generate OTP" onPress={() => checkUserSignedUp(phn)} />
      </View>

      <View>
        <Text style={{fontSize: 20}}>
          New to app?
          <Text
            style={{color: 'blue', fontSize: 20}}
            onPress={() => navigation.navigate('SignUp')}>
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header1: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 25,
  },

  header2: {
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    padding: 5,
  },

  header3: {
    fontSize: 17,
    color: 'grey',
    textAlign: 'center',
    padding: 10,
    margin: 10,
  },

  screen: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    borderBottomColor: 'lightblue',
    color: 'black',
    fontWeight: '300',
    width: 160,
    fontSize: 20,
    marginTop: 25,
  },
  text: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },

  btn: {
    margin: 100,
    borderRadius: 15,
  },

  picker: {
    height: 50,
    width: 150,
  },
});
