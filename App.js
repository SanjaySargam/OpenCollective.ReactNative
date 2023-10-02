import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './components/TransactionScreen';
import ExpenseScreen from './components/ExpenseScreen';
import ProfileScreen from './components/ProfileScreen';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './components/context';
import { ThemeProvider } from './components/ThemeProvider';
import HomeScreen from './components/HomeScreen';
import { authorize, ServiceConfiguration } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingScreen from './components/SettingScreen';
import { client } from './components/apolloClient';
import InfoScreen from './components/InfoScreen';
import NotificationScreen from './components/NotificationScreen';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';

const config = {
  issuer: 'https://opencollective.com/oauth/authorize',
  grant_type: 'authorization_code',
  clientId: '601a11568b7504a9addb',
  clientSecret: 'ed441c54424d997d27ee9d64d73b3bdf08143c4c',
  redirectUrl: 'com.opencollective.dev:/callback',
  scopes: ['account'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://opencollective.com/oauth/authorize',
    tokenEndpoint: 'https://opencollective.com/oauth/token',
  },
  skipCodeExchange: true,
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      accessToken: null,
    };
  }

  handlePostRequest = async (code) => {
    const url = 'https://opencollective.com/oauth/token';
    const bodyParams = new URLSearchParams();
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('code', code);
    bodyParams.append('client_id', config.clientId);
    bodyParams.append('client_secret', config.clientSecret);
    bodyParams.append('redirect_uri', config.redirectUrl);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        this.setState({ accessToken: data.access_token });
        await AsyncStorage.setItem('accessToken', data.access_token);
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  authenticate = async () => {
    try {
      const authResult = await authorize(config);
      console.log('authresult', authResult);
      await this.handlePostRequest(authResult.authorizationCode);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  componentDidMount() {
    // const { accessToken } = this.state;
    // if (!accessToken) {
    //   this.loadStoredToken();
    // }
  }

  // loadStoredToken = async () => {
  //   try {
  //     const storedToken = await AsyncStorage.getItem('accessToken');
  //     if (storedToken) {
  //       this.setState({ accessToken: storedToken });
  //     } else {
  //       this.authenticate();
  //     }
  //   } catch (error) {
  //     console.error('Error loading stored token:', error);
  //   }
  // };

  render() {
    return (
      <ThemeProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Settings" component={SettingScreen} />
              <Stack.Screen name="Info" component={InfoScreen} />
              <Stack.Screen name="Notification" component={NotificationScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default App;
