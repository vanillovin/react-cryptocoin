import { atom } from 'recoil';

// 두 가지를 요구 - 고유키, 기본값
export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});
