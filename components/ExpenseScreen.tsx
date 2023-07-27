import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect,useState } from 'react'
import {fetchExpenses} from './fetchAPI'

export interface ApiResponse {
  data: {
    account: {
      name: string;
      slug: string;
      transactions: {
        totalCount: number;
        nodes: Transaction[];
      };
    };
  };
}
export interface Transaction {
  type: string;
  fromAccount: {
    name: string;
    slug: string;
  };
  amount: {
    value: number;
    currency: string;
  };
  createdAt: string;
}


const ExpenseScreen = () => {
  const [expensesData, setExpensesData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');


  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountData = await fetchExpenses();
        setName(accountData.name);
        setTransactions(accountData.transactions.nodes);
        setLoading(false);
      } catch (error) {
        setError('Error fetching account data: ' + "error.message");
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Name: {name}</Text>
      <Text>Total Transactions: {transactions.length}</Text>
      <Text>Transactions:</Text>
      {transactions.map((transaction, index) => (
        <View key={index}>
          <Text>Type: {transaction.type}</Text>
          <Text>From Account: {transaction.fromAccount.name}</Text>
          <Text>Amount: {transaction.amount.value}</Text>
          <Text>Currency: {transaction.amount.currency}</Text>
          <Text>Created At: {transaction.createdAt}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseScreen