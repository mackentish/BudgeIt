import {useQuery} from 'react-query';
import {fetchPockets} from '../../api';

export default function usePockets() {
  const query = useQuery('allPockets', fetchPockets);
  return query;
}
