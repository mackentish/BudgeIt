import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPockets as fetchPocketsFn, updatePocket as updateFn, createPocket as createFn } from '../../api/pockets';
import { Alert } from 'react-native';
import { Pocket } from '../../types';

export default function usePockets() {
  // GET /pockets
  const fetchPockets = useQuery(['userPockets'], () => fetchPocketsFn());
  // PUT /pockets/:id
  const updatePocket = useMutation(updateFn, {
    onSuccess: () => {
      fetchPockets.refetch();
    },
  });
  // POST /pockets
  const createPocket = useMutation(
    (pocket: Omit<Pocket, '_id'>) => {
      return createFn(pocket);
    },
    {
      onSuccess: () => {
        fetchPockets.refetch();
      },
      onError: () => {
        Alert.alert('Error', 'Sorry, we are unable to create another pocket for you.');
      },
    },
  );

  return { fetchPockets, updatePocket, createPocket };
}
