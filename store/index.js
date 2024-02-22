import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = {
  phoneNum: '+91',
  code: '',
  confirm: '',
  isLogged: false,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState: initialState,
  reducers: {
    setphNum(state, action) {
      state.phoneNum = action.payload;
    },

    setCode(state, action) {
      state.code = action.payload;
    },

    setConfirmation(state, action) {
      state.confirm = action.payload;
    },

    setIsLogged(state) {
      state.isLogged = !state.isLogged;
    },
  },
});

const initialSignupState = {
  email: '',
  name: '',
  phNum: '',
  password: '',
  userId: '',
  profileImg: '',
  isRegistered: false,
  flag: 0,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: initialSignupState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setphNum(state, action) {
      state.phNum = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setProfileImg(state, action) {
      state.profileImg = action.payload;
    },
    setIsRegistered(state, action) {
      state.isRegistered = !state.isRegistered;
    },
    setIsFlag(state, action) {
      state.flag = 1;
    },
  },
});

const initialUploadState = {
  imageUrl: '',
  extractedData: null,
  document: [],
};

const UploadImageSlice = createSlice({
  name: 'uploadImage',
  initialState: initialUploadState,
  reducers: {
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
    setExtracted(state, action) {
      state.extractedData = action.payload;
    },
    setDocuments(state, action) {
      state.document = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    otp: otpSlice.reducer,
    upload: UploadImageSlice.reducer,
    signUp: signUpSlice.reducer,
  },
});

export const optActions = otpSlice.actions;
export const uploadActions = UploadImageSlice.actions;
export const signUpActions = signUpSlice.actions;
export default store;
