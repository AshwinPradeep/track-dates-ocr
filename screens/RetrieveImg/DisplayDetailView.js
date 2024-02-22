import React from 'react';
import {Text, View, Image} from 'react-native';

const DisplayDetailView = ({route, navigation}) => {
  const {imgUrl, imgName} = route.params;

  const processImage = async url => {
    if (url) {
      try {
        const response = await recogniseImage(url);
        console.log('processImage =>>>>>>>>>>>>>>>', response);
        if (response?.blocks?.length > 0) {
          dispatch(uploadActions.setExtracted(response));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <View>
      <Text style={{textAlign: 'center', margin: 20}}>{imgName}</Text>

      <Image
        source={{uri: imgUrl}}
        style={{width: 300, height: 250, margin: 30, borderRadius: 25}}
      />
    </View>
  );
};

export default DisplayDetailView;
