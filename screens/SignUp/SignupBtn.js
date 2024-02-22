import {Button} from 'react-native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {signUpActions} from '../../store';
import HttpReqHandler from '../../RequestHandler/reqHandler';

const SignupBtn = ({navigation}) => {
  // console.log('signupbtn');
  const dispatch = useDispatch();
  // //get the values from global state

  const email = useSelector(state => state.signUp.email);
  const name = useSelector(state => state.signUp.name);
  const ph = useSelector(state => state.signUp.phNum);
  const password = useSelector(state => state.signUp.password);

  const validateSignUpForm = async () => {
    console.log('_____*****_____');
    console.log(email, name, ph, password);

    const pattern = new RegExp(/^[0-9\b]+$/);
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (!expression.test(String(email).toLowerCase())) {
      alert('error in email');
      return;
    }

    if (!pattern.test(ph) || ph.length != 10) {
      alert('Error in Phone Number');
      return;
    }

    if (name.length < 3) {
      alert('Name should be greater than 3 characters');
      return;
    }

    //storing user details in mongodb

    const datatopost = {
      name: name,
      email: email,
      phone: ph,
      password: 'sdf',
      profileImage: 'ds',
    };
    const saveUserUrl =
      'https://thawing-river-00445.herokuapp.com/api/user/save';
    const response = HttpReqHandler(saveUserUrl, 'POST', datatopost, null);
    response.then(cleanData => {
      console.log('api response in signupBtn =>>', cleanData);

      if (cleanData.payload == undefined) {
        alert('User Details Exists');
        return;
      } else {
        dispatch(signUpActions.setUserId(cleanData.payload.userId));
        navigation.navigate('Home');
      }
    });
    response.catch(err => console.log('api error in signupBtn', err));
  };

  return (
    <TouchableOpacity style={styles.btn}>
      <Button
        color="orange"
        title="Create Account"
        onPress={validateSignUpForm}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //Check project repo for styles
  btn: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignupBtn;
