import axios from 'axios';
import { ResponseSignin } from 'types/auth';

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const authAPI = {
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ResponseSignin> => {
    return authInstance
      .post('/users/login', { email, password })
      .then((res) => {
        return res.data;
      });
  },
};
