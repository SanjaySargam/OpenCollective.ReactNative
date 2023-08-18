import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { fetchExpenses, ApiResponse, Transaction } from './fetchAPI'
import Card from './Card';
import { useTheme } from './ThemeProvider'

const ExpenseScreen: React.FC = () => {
  const [expensesData, setExpensesData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.backgroundPrimary
    },
  });
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
    <ScrollView style={styles.container}>
      {transactions.map((transaction, index) => (
        <Card key={index} {...transaction} />
      ))}
    </ScrollView>
  );
};




export default ExpenseScreen