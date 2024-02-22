import React from 'react';
import {useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import Card from '../../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import {uploadActions} from '../../store';
import {recogniseImage} from '../../mlkit';
import {signUpActions} from '../../store';
import HttpReqHandler from '../../RequestHandler/reqHandler';

const DisplayImages = ({navigation}) => {
  const userIdentity = useSelector(state => state.signUp.userId);
  const statePhonNum = useSelector(state => state.otp.phoneNum);
  const dispatch = useDispatch();
  const cards = useSelector(state => state.upload.document);

  useEffect(() => {
    const getImagesurl =
      'https://thawing-river-00445.herokuapp.com/api/document/getphone?phone=';
    const response = HttpReqHandler(getImagesurl, 'GET', null, statePhonNum);
    response.then(cleanData => {
      dispatch(
        uploadActions.setDocuments(
          cleanData.documents[0].documents_output.document,
        ),
      );
      dispatch(signUpActions.setEmail(cleanData.documents[0].email));
      dispatch(signUpActions.setphNum(cleanData.documents[0].phone));
      dispatch(signUpActions.setName(cleanData.documents[0].name));
      dispatch(signUpActions.setUserId(cleanData.documents[0].userId));
    });
    response.catch(err => console.log('api error in display images =>>>', err));
  }, []);

  return (
    <View>
      {cards.length > 0 ? (
        <FlatList
          data={cards}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DisplayDetailView', {
                  imgUrl: item.imageUrl[0],
                  imgName: item.name[0],
                });
              }}>
              <Card height={30}>
                <Image
                  source={{uri: item.imageUrl[0]}}
                  style={{width: 90, height: 70}}
                />
                <Text>{item.name[0]}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 250,
              fontSize: 25,
            }}>
            No images scanned !!!
          </Text>
        </View>
      )}
    </View>
  );
};

export default DisplayImages;
