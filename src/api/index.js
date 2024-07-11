import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.209.27.220:8080',
  timeout: 7000,
  headers: {
    'Content-type': 'Application/json',
    Accept: 'Application/json',
  },
});

export const loginApi = params => {
  return instance.post('/auth', params);
};
export const registApi = params => {
  return instance.post('/accounts', params);
};
