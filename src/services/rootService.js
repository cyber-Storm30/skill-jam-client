import axios from 'axios';
import {Image} from 'react-native';
``;

export const BASE_URI = 'http://192.168.1.2:5001/api';
// export const BASE_URI = 'http://192.168.29.31:9001/api';
// export const BASE_URI = 'http://172.20.10.4:5001/api';

export const postData = async (url, requestData = null, token) => {
  const apiUri = `${BASE_URI}${url}`;
  try {
    const response = await axios.post(apiUri, JSON.stringify(requestData), {
      headers: {
        'Content-Type ': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const statusCode = response.status;
    const responseJson = response.data;
    return {...responseJson, statusCode};
  } catch (error) {
    console.log('POST ERORR', error);
    return error.response ? error.response : error;
  }
};

export const patchData = async (url, requestData = null) => {
  const apiUri = `${BASE_URI}${url}`;
  //   console.log('APIURI ', apiUri);
  try {
    const response = await axios.patch(apiUri, JSON.stringify(requestData), {
      headers: {
        'Content-Type ': 'application/json',
      },
    });
    const statusCode = response.status;
    const responseJson = response.data;
    return {...responseJson, statusCode};
  } catch (error) {
    console.log('POST ERORR', error);
    return error.response ? error.response : error;
  }
};

export const getData = async (url, requestData = {}, token) => {
  const apiUri = `${BASE_URI}${url}`;
  try {
    const response =
      Object.keys(requestData).length !== 0
        ? await axios.get(apiUri, {
            headers: {},
            params: requestData,
          })
        : await axios.get(apiUri, {
            headers: {
              secretapikey: token,
            },
          });
    const {status} = response;
    const responseJson = await response.data;
    return {...responseJson, status};
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error;
  }
};
