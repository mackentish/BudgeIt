import { useMutation, useQuery } from '@tanstack/react-query';
import { getGroups, postGroup, deleteGroup as deleteFn } from '../../api/groups';
import { Alert } from 'react-native';
import { PocketGroup } from '../../types';

export default function useGroups() {
  // GET /groups
  const fetchGroups = useQuery(['userPocketGroups'], () => getGroups());

  // POST /groups
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

  // DELETE /groups/:id
  const deleteGroup = useMutation(
    (id: string) => {
      return deleteFn(id);
    },
    {
      onSuccess: () => {
        fetchGroups.refetch();
      },
      onError: () => {
        Alert.alert('Error', 'Sorry, we are unable to delete this pocket.');
      },
    },
  );

  return { fetchGroups, createGroup, deleteGroup };
}
