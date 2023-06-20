import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPockets as fetchPocketsFn, updatePocket as updateFn, createPocket as createFn } from '../../api/pockets';
import { Alert } from 'react-native';
import { Pocket } from '../../types';

export default function usePockets(userId: string | undefined) {
  // GET /pockets
  const fetchPockets = useQuery(
    ['userPockets', userId],
    () => fetchPocketsFn(userId!), // userId is not undefined here because of the query config below (enabled)
    {
      enabled: !!userId,
    },
  );
  // PUT /pockets/:id
  const updatePocket = useMutation(updateFn, {
    onSuccess: () => {
      fetchPockets.refetch();
    },
  });
  // POST /pockets
  const createPocket = useMutation(
    (pocket: Pocket) => {
      return createFn(pocket, userId!);
    },
    {
      onSuccess: () => {
        fetchPockets.refetch();
      },
      onError: () => {
        Alert.alert(
          'Error',
          'Sorry, we are unable to create another pocket for you. You might be at your maximum (10)',
        );
      },
    },
  );

  return { fetchPockets, updatePocket, createPocket };
}
