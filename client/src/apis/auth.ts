import axios from 'axios';
import { RequestSignin, RequestSignup, ResponseSignin, ResponseSignup } from 'types/auth';

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const authAPI = {
  signin: (data: RequestSignin): Promise<ResponseSignin> => {
    return authInstance.post('/users/login', data).then((res) => {
      return res.data;
    });
  },
  signup: (data: RequestSignup): Promise<ResponseSignup> => {
    return authInstance.post('/users/create', data).then((res) => {
      return res.data;
    });
  },
};
