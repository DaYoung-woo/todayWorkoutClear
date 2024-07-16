import {StyleSheet} from 'react-native';

export const regist = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  registBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
  },
  registBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export const login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  logoArea: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoIcon: {
    height: 60,
    width: 60,
    marginTop: -14,
  },
  logoText: {
    fontFamily: 'JalnanGothicTTF',
    fontSize: 32,
    color: '#2E8CF4',
  },
  textInputLabel: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    width: '100%',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
  },
  errorMsg: {
    color: 'red',
    paddingTop: 4,
    height: 24,
    marginLeft: 2,
  },
  loginBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 12,
  },
  loginBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    fontWeight: 'bold',

    color: '#fff',
  },
  registBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2E8CF4',
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
