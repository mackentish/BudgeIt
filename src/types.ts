export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pockets: Pocket[];
}

export interface Pocket {
  _id: string;
  name: string;
  amount: number;
}
