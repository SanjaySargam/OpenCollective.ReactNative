import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, {useEffect,useState} from 'react'
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
import auth from '@react-native-firebase/auth'; // Add this line to import the 'auth' object


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.opencollective.com/graphql/v2/6b6604a2c9e0ed5459af4e38f1473c630251de5b',
  cache: new InMemoryCache()
});

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, update isLoggedIn state to true
        setIsLoggedIn(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <ApolloProvider client={client}>
        {isLoggedIn ? (
          <HomePage/>
        ) : (
          <NavigationContainer>
          <Stack.Navigator initialRouteName='LoginPage'>
            <Stack.Screen name='SignUpPage' component={SignUpPage} />
            <Stack.Screen name='LoginPage' component={LoginPage} />
            {/* Other screens and configurations */}
          </Stack.Navigator>
          </NavigationContainer>
        )}
    </ApolloProvider>
  );
}

export default App