export interface User {
  _id: number;
  name: string;
  pockets: Pocket[];
}

export interface Pocket {
  _id: number;
  name: string;
  amount: number;
}
