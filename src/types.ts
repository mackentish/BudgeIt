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
  note?: string;
  groupId?: string;
}

export interface PocketGroup {
  _id: string;
  name: string;
  note?: string;
  pockets: Pocket[];
}

export interface Transaction {
  _id: string;
  name: string;
  amount: number;
  date: Date;
  inflow: string;
  outflow: string;
  tags?: string[];
  note?: string;
}

export interface DropdownOption {
  label: string;
  value: string;
  isHeader?: boolean;
}
