import axios from 'axios';
import {makeQueryString} from '../utils/helpers';
// api 문서 경로
// http://13.209.27.220:8080/swagger-ui/index.html#/auth-controller/login
const instance = axios.create({
  baseURL: 'http://13.209.27.220:8080',
  headers: {
    'Content-type': 'Application/json',
    Accept: 'Application/json',
  },
  withCredentials: true,
});

// header 쿠키 세팅
export const setCookie = cookie => {
  cookie.split('=')[1];
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
  return instance.get(`/feed${makeQueryString(params)}`);
};

// 피드 추가 api
export const addFeedListApi = params => {
  return instance.post('/feed', params, {
    headers: {'Content-Type': 'multipart/form-data'},
    transformRequest: formData => formData,
  });
};

// 내정보 api
export const getAccountInfoApi = () => {
  return instance.get('/accounts/info');
};

// 마이페이지 api
export const accountInfoDetail = () => {
  return instance.get('/accounts/info/mypage');
};

// 내정보 수정 api
export const updateAccountInfo = params => {
  return instance.patch('/accounts', params);
};

// 피드 상세 api
export const getFeedDetail = id => {
  return instance.get(`/feed/${id}`);
};

// 감정 표현 api
export const updateFeedEmotion = (feedId, emotionType) => {
  return instance.post(`/feed/${feedId}/emotion?emotionType=${emotionType}`);
};

// 댓글 작성
export const addCommentApi = (feedId, reply) => {
  return instance.post(`/feed/${feedId}/reply`, {reply});
};

// 피드 태그 검색
export const searchFeedApi = param => {
  return instance.get(`/feed/search${makeQueryString(param)}`);
};

// 댓글 수정
export const updateCommentApi = param => {
  return instance.put(
    `/feed/${param.feedId}/reply/${param.replyId}`,
    param.reply,
  );
};
