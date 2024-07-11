const axios = require('axios');
import {API_URL} from '@env';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 7000,
});

export const loginApi = params => {
  return instance.post('/auth', params);
};
export const registApi = params => {
  return instance.post('/accounts', params);
};
