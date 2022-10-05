import { UserProfile } from 'types/auth';
import { atom } from 'recoil';

export const authState = atom<UserProfile>({
  key: 'auth/profile',
  default: {
    email: '',
    userName: '',
  },
});
