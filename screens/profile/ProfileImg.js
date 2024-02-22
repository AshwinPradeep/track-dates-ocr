import React, {useEffect} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {signUpActions} from '../../store';

const ProfileImg = () => {
  const dispatch = useDispatch();
  const profileImgUrl = useSelector(state => state.signUp.profileImg);

  useEffect(() => {
    dispatch(
      signUpActions.setProfileImg(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      ),
    );

    /////

    ///
  }, []);

  const handleProfileImg = () => {
    launchImageLibrary({height: 100, width: 100}, res => {
      if (!res.didCancel) {
        console.log(res.assets[0].uri);
        dispatch(signUpActions.setProfileImg(res.assets[0].uri));
      }
    });
  };

  return (
    <View style={styles.imgcontainer}>
      <TouchableOpacity onPress={handleProfileImg}>
        <Image
          style={styles.img}
          source={{
            uri: profileImgUrl,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imgcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 80,
    marginRight: 80,
  },
});

export default ProfileImg;
