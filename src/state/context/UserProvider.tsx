import React, {createContext, useState, useEffect} from 'react';
import {Pocket, User} from '../../types';
import {usePockets} from '../queries';
import {Login} from '../../screens';

type ContextType = {
  user: User;
  pockets: Pocket[];
  signOut: () => void;
};

export const UserContext = createContext<ContextType>({} as ContextType);

export function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [pockets, setPockets] = useState<Pocket[]>([]);
  const {fetchPockets} = usePockets(user?._id);

  useEffect(() => {
    if (user && fetchPockets.data) {
      setPockets(fetchPockets.data);
    }
  }, [user, fetchPockets.data]);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <UserContext.Provider
      value={{
        user: user!,
        pockets,
        signOut: () => setUser(undefined),
      }}>
      {children}
    </UserContext.Provider>
  );
}
