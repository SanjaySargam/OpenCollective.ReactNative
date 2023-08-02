import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import {fetchTransactions,ApiResponse,Transaction} from './fetchAPI'
import TransactionCard from './TransactionCard';

const TransactionScreen = () => {
  const [expensesData, setExpensesData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');


  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountData = await fetchTransactions();
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
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} {...transaction} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TransactionScreen