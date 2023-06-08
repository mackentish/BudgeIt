import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Pocket, User} from '../../types';

type ContextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  pockets: Pocket[];
};

export const UserContext = createContext<ContextType>({} as ContextType);

export function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        pockets: user?.pockets || [],
      }}>
      {children}
    </UserContext.Provider>
  );
}
