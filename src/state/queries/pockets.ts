import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPockets as fetchPocketsFn, updatePocket as updateFn } from '../../api/pockets';

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

  return { fetchPockets, updatePocket };
}
