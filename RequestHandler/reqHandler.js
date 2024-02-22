import {useState} from 'react';

const HttpReqHandler = async (url, type, databody, filter) => {
  if (type == 'GET') {
    if (filter) {
      url = url + filter;
      console.log('urlfromhttp', url);
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const resp = await response.json();
    return resp;
  } else if (type == 'POST') {
    console.log('Inside post');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(databody),
    });
    const resp_1 = await res.json();
    return resp_1;
  }
};

export default HttpReqHandler;
