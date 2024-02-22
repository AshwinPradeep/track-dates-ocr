import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {uploadActions} from '../store';
import storage from '@react-native-firebase/storage';
import {recogniseImage} from '../mlkit';
import HttpReqHandler from '../RequestHandler/reqHandler';

const ScanImg = ({navigation}) => {
  const dispatch = useDispatch();

  const img = useSelector(state => state.upload.imageUrl);
  console.log(img + '**');
  const options = {
    maxWidth: 2000,
  };

  const btnHandler = () => {
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        console.log(response.assets[0].uri);
        const imgUrl = response.assets[0].uri;
        dispatch(uploadActions.setImageUrl(imgUrl));
      } else {
        console.log('User cancelled the action');
      }
    });
  };

  const liveCambtnHandler = () => {
    launchCamera(options, response => {
      if (!response.didCancel) {
        const imgUrl = response.assets[0].uri;
        dispatch(uploadActions.setImageUrl(imgUrl));
      } else {
        console.log('User cancelled the action');
      }
    });
  };
  // const uploadImage = async () => {
  //   console.log(img + '*^*^*^*^*^*');
  //   const filename = img.substring(img.lastIndexOf('/') + 1);
  //   console.log(filename);
  //   const imageRef = storage().ref(filename);
  //   try {
  //     setIsLoading(true);
  //     await imageRef.putFile(img).catch(error => {
  //       console.log('upload error =>>', error);
  //     });

  //     const url = await imageRef
  //       .getDownloadURL()
  //       .catch(error => console.log('getdownloadUrl error'));

  //     //upload document data in mongodb
  //     await fetch(
  //       'https://thawing-river-00445.herokuapp.com/api/document/save',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           userId: userIdentity,
  //           document: {
  //             name: filename,
  //             imageUrl: url,
  //             expiryDate: '15/12/2023',
  //           },
  //         }),
  //       },
  //     )
  //       .then(res => res.json())
  //       .then(cleanData => {
  //         console.log('api uploadimage response =>>', cleanData);
  //       });

  //     console.log('URL =>>>>>>>>>>>>>>', url);
  //     setIsLoading(false);
  //     Alert.alert('success', 'Image uploaded successfully!!!');

  //     dispatch(uploadActions.setImageUrl(''));

  //     const fetchData = async () => {
  //       await fetch(
  //         'https://thawing-river-00445.herokuapp.com/api/document/get?userId=' +
  //           userIdentity,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       )
  //         .then(res => res.json())
  //         .then(cleanData => {
  //           console.log(
  //             'cleanData response =>>',
  //             cleanData.documents[0].document,
  //           );

  //           dispatch(
  //             uploadActions.setDocuments(cleanData.documents[0].document),
  //           );
  //         });
  //     };
  //     fetchData().catch(err => console.log('api error', err));
  //   } catch (e) {
  //     console.log('error in uploading');
  //   }
  // };

  const processImage = async url => {
    const ocrjson = [];
    if (url) {
      console.log('inside process image');
      try {
        const response = await recogniseImage(url);

        if (response?.blocks?.length > 0) {
          response.blocks.map(block => {
            block.lines.map(line => {
              ocrjson.push(line.text);
            });
          });
          console.log('array data', ocrjson);

          const databody = {
            ocr: ocrjson,
          };
          const ocrtojsonUrl =
            'https://thawing-river-00445.herokuapp.com/api/document/ocrtojson';
          const resp = HttpReqHandler(ocrtojsonUrl, 'POST', databody, null);
          resp.then(res => console.log('Res from json in scanimg file', res));
          resp.catch(err => console.log('Error in scanimg file', err));
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{width: 200}}>
        <Button title="scan" onPress={btnHandler} />
      </View>
      <View style={{width: 200, margin: 10}}>
        <Button title="Live Camera" onPress={liveCambtnHandler} />
      </View>

      {img ? (
        <View>
          <Image
            source={{uri: img}}
            style={{width: 200, height: 200, marginTop: 20, marginBottom: 20}}
          />
          <View
            style={{
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button title="Extract data" onPress={() => processImage(img)} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ScanImg;
