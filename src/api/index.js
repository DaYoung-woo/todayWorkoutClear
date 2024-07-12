import axios from 'axios';

// api 문서 경로
// http://13.209.27.220:8080/swagger-ui/index.html#/auth-controller/login
const instance = axios.create({
  baseURL: 'http://13.209.27.220:8080',
  timeout: 7000,
  headers: {
    'Content-type': 'Application/json',
    Accept: 'Application/json',
  },
});

// header 쿠키 세팅
export const setCookie = cookie => {
  instance.defaults.headers.Cookies = JSON.parse(cookie);
};

// 로그인 api
export const loginApi = params => {
  return instance.post('/auth', params);
};

// 회원가입 api
export const registApi = params => {
  return instance.post('/accounts', params);
};
