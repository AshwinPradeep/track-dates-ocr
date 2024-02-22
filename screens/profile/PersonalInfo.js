import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/Card';
import {signUpActions} from '../../store';

const PersonalInfo = () => {
  const email = useSelector(state => state.signUp.email);
  const name = useSelector(state => state.signUp.name);
  const ph = useSelector(state => state.signUp.phNum);

  const dispatch = useDispatch();

  return (
    <View>
      <Text style={styles.header}>Personal Information</Text>
      <Card height={70}>
        <Text>
          <Text style={styles.header}>Email : </Text>
          <Text style={styles.li}>{email}</Text>
        </Text>
      </Card>
      <Card height={30}>
        <Text>
          <Text style={styles.header}>Name : </Text>
          <Text style={styles.li}>{name}</Text>
        </Text>
      </Card>
      <Card height={30}>
        <Text>
          <Text style={styles.header}>Phone Number : </Text>
          <Text style={styles.li}>{ph}</Text>
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },

  editableinput: {
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    padding: 15,
  },

  inputcontainer: {
    borderWidth: 2,
    borderColor: 'grey',
  },

  li: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    margin: 10,
    fontSize: 20,
  },

  litext: {
    fontSize: 15,

    color: 'black',
  },
});

export default PersonalInfo;
