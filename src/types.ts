export interface User {
  _id: string;
  name: string;
  pockets: Pocket[];
}

export interface Pocket {
  _id: string;
  name: string;
  amount: number;
}
