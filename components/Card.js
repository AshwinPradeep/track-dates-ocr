import React from 'react';
import {StyleSheet, View} from 'react-native';

let hgt;
const Card = props => {
  hgt = props.height;
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
});

export default Card;
