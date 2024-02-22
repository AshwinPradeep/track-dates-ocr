import {NativeModules} from 'react-native';
const {TextRecognitionModule} = NativeModules;

export const recogniseImage = url => {
  return TextRecognitionModule.recognizeText(url);
};
