export interface User {
  id: number;
  name: string;
  pockets: Pocket[];
}

export interface Pocket {
  id: number;
  name: string;
  amount: number;
}
