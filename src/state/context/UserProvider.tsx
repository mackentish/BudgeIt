import React, { createContext, useState } from 'react';
import { User } from '../../types';
import { Login } from '../../screens';

type ContextType = {
  user: User;
  signOut: () => void;
};

export const UserContext = createContext<ContextType>({} as ContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <UserContext.Provider
      value={{
        user: user!,
        signOut: () => setUser(undefined),
      }}>
      {children}
    </UserContext.Provider>
  );
}
