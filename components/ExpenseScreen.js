import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { fetchExpenses, Transaction } from './fetchAPI';
import Card from './Card';
import { useTheme } from './ThemeProvider';

class ExpenseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expensesData: null,
      loading: true,
      error: '',
      transactions: [],
      name: '',
      totalContributions:0
    };
  }

  componentDidMount() {
    this.fetchAccountData();
  }

  fetchAccountData = async () => {
    try {
      const accountData = await fetchExpenses();
      this.setState({
        name: accountData.name,
        transactions: accountData.transactions.nodes,
        loading: false,
        totalContributions: accountData.transactions.totalCount
      });
    } catch (error) {
      this.setState({
        error: 'Error fetching account data: ' + error.message,
      });
    }
  };

  render() {
    const { loading, error, transactions, totalContributions } = this.state;
    const { theme } = this.props;

    const styles = StyleSheet.create({
      container: {
        padding: 10,
        backgroundColor: theme.backgroundPrimary,
      },
    });

    // if (loading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator size="large" color="#000" />
    //     </View>
    //   );
    // }

    // if (error) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Error: {error}</Text>
    //     </View>
    //   );
    // }

    return (
      <ScrollView style={styles.container}>
        {loading && 
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.textColor} />
        </View>
        }
        {!loading && totalContributions===0 &&
        <View style={{justifyContent:'center',alignContent:'center',alignSelf:'center',alignItems:'center'}}>
        <Text style={{color:theme.textColor,fontSize:20}}>No Contributions</Text>
        </View>
        }
        {transactions && transactions.map((transaction, index) => (
          <Card key={index} {...transaction} />
        ))}
      </ScrollView>
    );
  }
}

export default function ThemedExpenseScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <ExpenseScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
