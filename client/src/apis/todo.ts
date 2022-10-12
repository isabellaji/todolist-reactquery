import axios from 'axios';
import { RequestTodo, RequestTodoWId, ResponseTodo } from 'types/todo';

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
  get: (): Promise<ResponseTodo[]> => {
    return todoInstance.get('/todos').then((res) => {
      return res.data.data;
    });
  },
  getById: (id?: string): Promise<ResponseTodo> => {
    return todoInstance.get(`/todos/${id}`).then((res) => {
      return res.data.data;
    });
  },
  create: (data: RequestTodo): Promise<ResponseTodo> => {
    return todoInstance.post('/todos', data).then((res) => {
      return res.data.data;
    });
  },
  update: (data: RequestTodoWId): Promise<ResponseTodo> => {
    return todoInstance.put(`/todos/${data.id}`, data).then((res) => {
      return res.data.data;
    });
  },
  delete: (id: string) => {
    return todoInstance.delete(`/todos/${id}`).then((res) => res.data);
  },
};
