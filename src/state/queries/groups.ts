import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroups, postGroup } from '../../api/groups';
import { Alert } from 'react-native';
import { PocketGroup } from '../../types';

export default function usePockets() {
  // GET /pockets
  const fetchGroups = useQuery(['userPocketGroups'], () => getGroups());
  // POST /pockets
  const createGroup = useMutation(
    (group: Omit<PocketGroup, '_id'>) => {
      return postGroup(group);
    },
    {
      onSuccess: () => {
        fetchGroups.refetch();
      },
      onError: () => {
        Alert.alert('Error', 'Sorry, we are unable to create another group for you.');
      },
    },
  );

  return { fetchGroups, createGroup };
}
