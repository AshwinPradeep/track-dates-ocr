import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

class Authenticated extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>You're Logged in</Text>
        <View style={{ marginTop: 30 }}>
          <Button title="Signout" onPress={() => auth().signOut()} />
        </View>
      </View>
    );
  }
  
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
  },
  text: {
    fontSize: 25,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
});

export default Authenticated;