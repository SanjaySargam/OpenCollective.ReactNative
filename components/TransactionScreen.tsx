import { View, Text,StyleSheet,ActivityIndicator,ScrollView } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import {fetchTransactions,ApiResponse,Transaction} from './fetchAPI'
import TransactionCard from './TransactionCard';
import {storeSlug} from './AsyncStorage'
import auth from '@react-native-firebase/auth'
import {getSlug} from './firebaseQueries'
import Card from './Card';

const TransactionScreen: React.FC = () => {
  const [expensesData, setExpensesData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');


  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const currentUser = auth().currentUser;
        const slug = await getSlug(currentUser?.uid as string)
        await storeSlug(slug as string)
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
    <ScrollView style={styles.container}>
      {transactions.map((transaction, index) => (
        <Card key={index} {...transaction} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:10,
    
  },
});

export default TransactionScreen