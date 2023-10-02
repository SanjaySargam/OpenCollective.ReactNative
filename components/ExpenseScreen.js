import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import {fetchExpenses} from './fetchAPI';
import Card from './Card';
import {useTheme} from './ThemeProvider';

class ExpenseScreen extends Component {
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
      const accountData = await fetchExpenses();
      this.setState({
        name: accountData.name,
        transactions: accountData.transactions.nodes,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Error fetching account data: ' + error.message,
      });
    }
  };

  render() {
    const {loading, transactions} = this.state;
    const {theme} = this.props;

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
        {loading && (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        {transactions.map((transaction, index) => (
          <Card key={index} {...transaction} />
        ))}
      </ScrollView>
    );
  }
}

export default function ThemedExpenseScreen(props) {
  const {theme, toggleTheme} = useTheme();
  return <ExpenseScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
