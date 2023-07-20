import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SignUpPage from './components/SignUpPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './components/TransactionScreen';
import ExpenseScreen from './components/ExpenseScreen';
import ProfileScreen from './components/ProfileScreen';
import { getCurrentUser } from './components/authService';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.opencollective.com/graphql/v2/6b6604a2c9e0ed5459af4e38f1473c630251de5b',
  cache: new InMemoryCache()
});

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


const App: React.FC = () => {
  const isLoggedIn = true; // Example: Set to true if the user is logged in

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name='Transactions' component={TransactionScreen} />
            <Tab.Screen name='Expenses' component={ExpenseScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='SignUp' component={SignUpPage} />
            <Stack.Screen name='Login' component={LoginPage} />
            {/* Other screens and configurations */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App