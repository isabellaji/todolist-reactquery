export interface User {
  id: string;
  email: string;
  password: string;
  userName: string;
  createdAt: string;
}

export type UserInput = Pick<User, 'email' | 'password' | 'userName'>;
