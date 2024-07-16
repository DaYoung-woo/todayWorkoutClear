import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCookie} from '../api';

// 쿼리 스트링 생성
export const makeQueryString = obj => {
  return Object.entries(obj)
    .map((el, idx) => `${idx === 0 ? '?' : '&'}${el[0]}=${el[1]}`)
    .join('');
};

// 쿠키 저장
export const saveCookieStorage = async res => {
  const [cookie] = res.headers['set-cookie'];
  const stringCookie = JSON.stringify(cookie);
  setCookie(stringCookie);

  try {
    await AsyncStorage.setItem('cookie', stringCookie);
  } catch (e) {
    console.log(e);
  }
};

// 쿠키 유효기간이 남아있는지 확인
export const checkCookieExpire = (storageCookie, navigation) => {
  const cookie = JSON.parse(storageCookie);
  const expire = cookie.match('(^|;) ?Expires=([^;]*)(;|$)')[2];
  const now = new Date();
  if (now < expire) {
    navigation.navigate('Login');
  } else {
    setCookie(storageCookie);
    navigation.navigate('Main', {load: true});
  }
};

// 스토리지에 사용자 정보 저장
export const saveUserInfo = async userInfo => {
  try {
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (e) {
    console.log(e);
  }
};

// 해시태그 추출
export const extractHashtags = content => {
  // 해시태그 패턴 정의
  const pattern = /#(\S+?)(?=\s|#|$)/g;
  let matches;
  let hashtags = [];
  // 정규 표현식으로 매칭되는 모든 부분을 찾음
  while ((matches = pattern.exec(content)) !== null) {
    hashtags.push(matches[1]);
  }
  return hashtags;
};
