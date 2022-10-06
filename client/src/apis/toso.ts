import axios from 'axios';
import { RequestTodo, ResponseTodo } from 'types/todo';

const todoInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

todoInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('todos');

  if (!config.headers?.Authorization) {
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const todoAPI = {
  create: (data: RequestTodo): Promise<ResponseTodo> => {
    return todoInstance.post('/todos', data).then((res) => {
      return res.data;
    });
  },
};
