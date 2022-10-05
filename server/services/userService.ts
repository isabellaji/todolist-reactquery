import { create, db } from '../models/db';
import type { User } from '../types/users';

export const createUser = async ({
  email,
  password,
  userName,
}: Pick<User, 'email' | 'password' | 'userName'>) => {
  const newUser = create<User>({ email, password, userName });

  db.data?.users.push(newUser);
  await db.write();

  return newUser;
};

export const findUser = (predicate: (user: User) => boolean) => {
  return db.data?.users.find(predicate);
};
