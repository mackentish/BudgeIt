import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {Pocket} from '../../types';
import {usePockets} from '../queries';

type ContextType = {
  pockets: Pocket[];
  setPockets: Dispatch<SetStateAction<Pocket[]>>;
};

export const UserContext = createContext<ContextType>({} as ContextType);

export function UserProvider({children}: {children: React.ReactNode}) {
  const [pockets, setPockets] = useState<Pocket[]>([]);
  const {allPockets} = usePockets();

  useEffect(() => {
    if (allPockets.data) {
      setPockets(allPockets.data);
    }
  }, [allPockets.data]);

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
