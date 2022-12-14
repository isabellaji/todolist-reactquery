import { atom } from 'recoil';
import { UserProfile } from 'types/auth';
import { ResponseTodo } from 'types/todo';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: boolean | string, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const authState = atom<UserProfile>({
  key: 'auth/profile',
  default: {
    userName: '',
  },
  effects: [localStorageEffect('user')],
});

export const themeState = atom({
  key: 'isDark',
  default: false,
  effects: [localStorageEffect('isDark')],
});
