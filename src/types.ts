export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  unallocated: number;
  pockets: Pocket[];
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Pocket {
  _id: string;
  name: string;
  amount: number;
}
