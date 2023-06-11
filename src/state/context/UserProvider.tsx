import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import {Pocket, User} from '../../types';
import {usePockets} from '../queries';

type ContextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  pockets: Pocket[];
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        pockets,
      }}>
      {children}
    </UserContext.Provider>
  );
}
