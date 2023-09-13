import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { addTransaction, getTransactions } from '../../api/transactions';
import { Transaction } from '../../types';

export default function useTransactions() {
  // GET /transactions
  const fetchTransactions = useQuery(['userTransactions'], () => getTransactions());

  // POST /transactions
  const createTransaction = useMutation(
    (transaction: Omit<Transaction, '_id'>) => {
      return addTransaction(transaction);
    },
    {
      onSuccess: () => {
        fetchTransactions.refetch();
      },
      onError: () => {
        Alert.alert('Error', 'Sorry, we are unable to create this transaction for you.');
      },
    },
  );

  return { fetchTransactions, createTransaction };
}
