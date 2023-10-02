import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { fetchTransactions, ApiResponse, Transaction } from './fetchAPI';
import auth from '@react-native-firebase/auth';
import Card from './Card';
import { useTheme } from './ThemeProvider';

class TransactionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expensesData: null,
      loading: true,
      error: '',
      transactions: [],
      name: '',
    };
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  fetchAccountData = async () => {
    try {
      // const currentUser = auth().currentUser;
      // const slug = await getSlug(currentUser?.uid as string);
      // await storeSlug(slug as string);
      const accountData = await fetchTransactions();
      console.log('account data', accountData);
      this.setState({
        name: accountData.name,
        transactions: accountData.transactions.nodes,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Error fetching account data: ' + error.message,
        loading: false,
      });
    }
  };

  render() {
    const { theme } = this.props
    const { loading, error, transactions } = this.state;

    const styles = StyleSheet.create({
      container: {
        padding: 10,
        backgroundColor: theme.backgroundPrimary,
      },
    });

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
  }
}

export default function ThemedTransactionScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <TransactionScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}

