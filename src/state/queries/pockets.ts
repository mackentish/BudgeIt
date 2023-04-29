import {useMutation, useQuery} from 'react-query';
import {fetchPockets, updatePocket as updateFn} from '../../api';

export default function usePockets() {
  // GET /pockets
  const allPockets = useQuery('allPockets', fetchPockets);
  // PUT /pockets/:id
  const updatePocket = useMutation(updateFn, {
    onSuccess: () => {
      allPockets.refetch();
    },
  });

  return {allPockets, updatePocket};
}
