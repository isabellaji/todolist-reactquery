export interface RequestSignin {
  email: string;
  password: string;
}

export interface ResponseSignin {
  token: string;
  userName: string;
}

export interface RequestSignup {
  email: string;
  password: string;
  userName: string;
}

export interface ResponseSignup {
  token: string;
}

export interface UserProfile {
  userName: string;
}
