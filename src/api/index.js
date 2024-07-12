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
  withCredentials: true,
});

// 쿼리 스트링 생성
const makeQueryString = obj => {
  return Object.entries(obj)
    .map((el, idx) => `${idx === 0 ? '?' : '&'}${el[0]}=${el[1]}`)
    .join('');
};

// header 쿠키 세팅
export const setCookie = cookie => {
  instance.defaults.headers.Cookies = cookie;
};

// 로그인 api
export const loginApi = params => {
  return instance.post('/auth', params);
};

// 회원가입 api
export const registApi = params => {
  return instance.post('/accounts', params);
};

// 피드 리스트 api
export const feedListApi = params => {
  console.log(instance.defaults.headers.Cookies);
  return instance.get(`/feed${makeQueryString(params)}`);
};

// 피드 추가 api
export const addFeedList = params => {
  return instance.post('/feed', params);
};
