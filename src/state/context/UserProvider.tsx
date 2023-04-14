import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Pocket} from '../../types';

type ContextType = {
  pockets: Pocket[];
  setPockets: Dispatch<SetStateAction<Pocket[]>>;
};

export const UserContext = createContext<ContextType>({} as ContextType);

export function UserProvider({children}: {children: React.ReactNode}) {
  const [pockets, setPockets] = useState<Pocket[]>([
    {
      id: 1,
      name: 'Entertainment',
      amount: 1000,
    },
    {
      id: 2,
      name: 'Food',
      amount: 2000,
    },
    {
      id: 3,
      name: 'Bills',
      amount: 3000,
    },
    {
      id: 4,
      name: 'Subscriptions',
      amount: 200,
    },
    {
      id: 5,
      name: 'Daycare',
      amount: 3000,
    },
    {
      id: 6,
      name: 'Daycare',
      amount: 3000,
    },
    {
      id: 7,
      name: 'Daycare',
      amount: 3000,
    },
    {
      id: 8,
      name: 'Daycare',
      amount: 3000,
    },
  ]);
  return (
    <UserContext.Provider
      value={{
        pockets,
        setPockets,
      }}>
      {children}
    </UserContext.Provider>
  );
}
