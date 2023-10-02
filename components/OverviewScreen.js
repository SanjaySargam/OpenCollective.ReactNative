import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { fetchBalance } from './fetchAPI';
import { useTheme } from './ThemeProvider';

class OverviewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: '',
      stats: {
        balance: { value: 0, currency: '' },
        totalAmountSpent: { value: 0, currency: '' },
        totalNetAmountReceived: { value: 0, currency: '' },
        yearlyBudget: { value: 0, currency: '' },
      },
      type: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetchBalance();
      this.setState({
        stats: response.stats,
        type: response.type,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        error: 'An error occurred while fetching data.',
      });
    }
  };

  render() {
    const { theme } = this.props
    const { loading, error, stats, type } = this.state;

    const styles = StyleSheet.create({
      scrollViewContent: {
        flexGrow: 1,
      },
      container: {
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
      },
      content: {
        flex: 1,
        zIndex: 1,
      },
      background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.mainTheme,
        height: 130,
      },
      card: {
        backgroundColor: theme.backgroundColor,
        borderRadius: 16,
        margin: 20,
        padding: 20,
        elevation: 2,
      },
      balance: {
        color: theme.gray,
      },
      amount: {
        color: theme.textColor,
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 8,
      },
      actionContainer: {
        flexDirection: 'row',
      },
      action: {
        backgroundColor: theme.mainTheme,
        borderRadius: 16,
        color: theme.backgroundColor,
        padding: 16,
        margin: 8,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
    });

    const data = [
      {
        id: 1,
        balance:
          type === 'INDIVIDUAL'
            ? `TOTAL RECEIVED WITH EXPENSES`
            : `TODAY'S BALANCE`,
        amount: `${stats.balance.value.toFixed(2)} ${stats.balance.currency}`,
      },
      {
        id: 3,
        balance:
          type === 'INDIVIDUAL'
            ? `TOTAL CONTRIBUTED`
            : `TOTAL DISBURSED`,
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
      <View style={styles.container}>
        <View style={styles.background} />
        <ScrollView style={styles.content}>
          {loading && 
          <View style={styles.container}>
            <View style={styles.card}>
            <SkeletonPlaceholder>
            <View style={{width:200,height:20}}></View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
            <View style={{width:150,height:30,marginTop:20}}></View>
            </SkeletonPlaceholder>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.action}>
                <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                  Contribute
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                  Submit Expense
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
          }
          {stats && type && !loading &&
          (type === 'INDIVIDUAL'
            ? data.slice(0, 2).map(({ balance, amount }) => (
                <View key={balance} style={styles.card}>
                  <Text style={styles.balance}>{balance}</Text>
                  <Text style={styles.amount}>{amount}</Text>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.action}>
                      <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                        Contribute
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                      <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                        Submit Expense
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : data.map(({ balance, amount }) => (
                <View key={balance} style={styles.card}>
                  <Text style={styles.balance}>{balance}</Text>
                  <Text style={styles.amount}>{amount}</Text>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.action}>
                      <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                        Contribute
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                      <Text style={{ textAlign: 'center', color: theme.backgroundColor }}>
                        Submit Expense
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )))
              }
        </ScrollView>
      </View>
    );
  }
}

export default function ThemedOverviewScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <OverviewScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
