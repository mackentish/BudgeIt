import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

import {
  createPocket as createFn,
  deletePocket as deleteFn,
  fetchPockets as fetchPocketsFn,
  updatePocket as updateFn,
} from '../../api/pockets';
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

  // DELETE /pockets/:id
  const deletePocket = useMutation(
    (id: string) => {
      return deleteFn(id);
    },
    {
      onSuccess: () => {
        fetchPockets.refetch();
      },
      onError: () => {
        Alert.alert('Error', 'Sorry, we are unable to delete this pocket.');
      },
    },
  );

  return { fetchPockets, updatePocket, createPocket, deletePocket };
}
