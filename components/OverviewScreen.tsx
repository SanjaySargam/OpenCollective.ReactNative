// src/ChatsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import { fetchBalance } from './fetchAPI';
import { useTheme } from './ThemeProvider'
const OverviewScreen: React.FC = () => {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    balance: { value: 0, currency: '' },
    totalAmountSpent: { value: 0, currency: '' },
    totalNetAmountReceived: { value: 0, currency: '' },
    yearlyBudget: { value: 0, currency: '' },
  });
  const [type, setType] = useState('');


  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary
    },
    content: {
      flex: 1,
      zIndex: 1, // Ensure the content is displayed above the background
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.mainTheme, // Set your desired background color here
      height: 130
    },
    card: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 8,
      margin: 20,
      padding: 20
    },
    balance: {
      color: theme.gray
    },
    amount: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: 28,
      marginTop: 8
    },
    actionContainer: {
      flexDirection: 'row',
      // justifyContent:'center',
      // alignContent:'center',
      flex: 1,
    },
    action: {
      backgroundColor: theme.mainTheme,
      borderRadius: 16,
      // justifyContent:'center',
      // alignSelf:'center',
      color: theme.backgroundColor,
      // textAlign:'center',
      // alignContent:'center',
      padding: 16,
      margin: 8,
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,

    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBalance()
        setStats(response.stats);
        setType(response.type);
        console.log("stats", response.stats)
        console.log("type", response.type)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const data = [
    {
      id: 1,
      balance: type === 'INDIVIDUAL' ? `TOTAL RECEIVED WITH EXPENSES
      `: `TODAY'S BALANCE`,
      amount: `${stats.balance.value.toFixed(2)} ${stats.balance.currency}`,
    },
    {
      id: 3,
      balance: type === 'INDIVIDUAL' ? `TOTAL CONTRIBUTED` : `TOTAL DISBURSED`,
      amount: `${stats.totalAmountSpent.value.toFixed(2)} ${stats.totalAmountSpent.currency}`,
    },
    {
      id: 2,
      balance: `TOTAL RAISED`,
      amount: `${stats.totalNetAmountReceived.value.toFixed(2)} ${stats.totalNetAmountReceived.currency}`,
    },
    {
      id: 4,
      balance: `ESTIMATED ANNUAL BUDGET`,
      amount: `${stats.yearlyBudget.value.toFixed(2)} ${stats.yearlyBudget.currency}`,
    },
  ];


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
      <View style={styles.background} />
      <ScrollView style={styles.content}>
      {type === 'INDIVIDUAL'
          ? data.slice(0, 2).map(({ balance, amount }) => (
              <View key={balance} style={styles.card}>
                <Text style={styles.balance}>{balance}</Text>
                <Text style={styles.amount}>{amount}</Text>
                <View style={styles.actionContainer}>
                  <Text style={styles.action}>Contribute</Text>
                  <Text style={styles.action}>Submit Expense</Text>
                </View>
              </View>
            ))
          : data.map(({ balance, amount }) => (
              <View key={balance} style={styles.card}>
                <Text style={styles.balance}>{balance}</Text>
                <Text style={styles.amount}>{amount}</Text>
                <View style={styles.actionContainer}>
                  <Text style={styles.action}>Contribute</Text>
                  <Text style={styles.action}>Submit Expense</Text>
                </View>
              </View>
            ))}

      </ScrollView>
    </View>
  );
};

export default OverviewScreen;
