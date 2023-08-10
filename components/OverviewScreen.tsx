// src/ChatsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useTheme} from './ThemeProvider'
const OverviewScreen: React.FC = () => {
  const {theme} = useTheme()
  const data = [
    {
      id: 1,
      balance: `TODAY'S BALANCE`,
      amount: `$15,102.00`,
    },
    {
      id: 2,
      balance: `TOTAL RAISED`,
      amount: `$61,937.00`,
    },
    {
      id: 3,
      balance: `TOTAL DISBURSED`,
      amount: `$46,834.00`,
    },
    {
      id: 4,
      balance: `ESTIMATED ANNUAL BUDGET`,
      amount: `$14,497`,
    },

  ]

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
      flex:1,
      backgroundColor:theme.backgroundPrimary
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
      height:130
    },
    card: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 8,
      height: 170,
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


  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <ScrollView style={styles.content}>
        {data.map(({ balance, amount }) => (
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
