import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {fetchTransactions} from './fetchAPI';
import Card from './Card';
import {useTheme} from './ThemeProvider';

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
      });
    }
  };

  render() {
    const {theme} = this.props;
    const {loading, transactions} = this.state;

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

export default function ThemedTransactionScreen(props) {
  const {theme, toggleTheme} = useTheme();
  return (
    <TransactionScreen {...props} theme={theme} toggleTheme={toggleTheme} />
  );
}
