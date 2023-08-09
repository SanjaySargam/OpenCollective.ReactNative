// src/ChatsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OverviewScreen: React.FC = () => {

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
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex:1,
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
    backgroundColor: '#97b7f3', // Set your desired background color here
    height:130
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 170,
    margin: 20,
    padding: 20
  },
  balance: {
    color: 'gray'
  },
  amount: {
    color: 'black',
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
    backgroundColor: '#97b7f3',
    borderRadius: 16,
    // justifyContent:'center',
    // alignSelf:'center',
    color: 'white',
    // textAlign:'center',
    // alignContent:'center',
    padding: 16,
    margin: 8,
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,

  }
})
export default OverviewScreen;