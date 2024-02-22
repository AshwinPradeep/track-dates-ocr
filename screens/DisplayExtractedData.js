import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {uploadActions} from '../store';

const DisplayExtractedData = () => {
  const extractedData = useSelector(state => state.upload.extractedData);
  const img = useSelector(state => state.upload.imageUrl);
  const userIdentity = useSelector(state => state.signUp.userId);

  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);

  const display = () => {
    console.log('data ->>>>>>>>>>>>>>>>>>>>>>', extractedData);
  };

  const uploadImage = async () => {
    console.log(img + '*^*^*^*^*^*');
    const filename = img.substring(img.lastIndexOf('/') + 1);
    console.log(filename);
    const imageRef = storage().ref(filename);
    try {
      setIsLoading(true);
      await imageRef.putFile(img).catch(error => {
        console.log('upload error =>>', error);
      });

      const url = await imageRef
        .getDownloadURL()
        .catch(error => console.log('getdownloadUrl error'));

      //upload document data in mongodb
      await fetch(
        'https://thawing-river-00445.herokuapp.com/api/document/save',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userIdentity,
            document: {
              name: filename,
              imageUrl: url,
              expiryDate: '15/12/2023',
            },
          }),
        },
      )
        .then(res => res.json())
        .then(cleanData => {
          console.log('api uploadimage response =>>', cleanData);
        });

      console.log('URL =>>>>>>>>>>>>>>', url);
      setIsLoading(false);
      Alert.alert('success', 'Image uploaded successfully!!!');

      dispatch(uploadActions.setImageUrl(''));

      const fetchData = async () => {
        await fetch(
          'https://thawing-river-00445.herokuapp.com/api/document/get?userId=' +
            userIdentity,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
          .then(res => res.json())
          .then(cleanData => {
            console.log(
              'cleanData response =>>',
              cleanData.documents[0].document,
            );

            dispatch(
              uploadActions.setDocuments(cleanData.documents[0].document),
            );
          });
      };
      fetchData().catch(err => console.log('api error', err));
    } catch (e) {
      console.log(e);
      console.log('error in uploading');
    }
  };

  return (
    <View>
      <View>
        {extractedData.blocks.map(block =>
          block.lines.map(line => {
            return (
              <View style={{margin: 10}}>
                <Text>{line.text}</Text>
              </View>
            );
          }),
        )}
      </View>
      <View style={{margin: 20}}>
        <Button onPress={() => uploadImage(img)} title="Upload Image" />
      </View>
      {loading && (
        <View style={{margin: 20}}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
    </View>
  );
};

export default DisplayExtractedData;
