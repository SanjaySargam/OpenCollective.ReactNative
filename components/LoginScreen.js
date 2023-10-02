import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { authorize, ServiceConfiguration } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from './themes';
import ThemeProvider, { useTheme } from './ThemeProvider';

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
  }, // Type assertion to ServiceConfiguration
  skipCodeExchange: true,
};

class LoginScreen extends Component {
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
        this.props.navigation.replace('Home')
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

  createAccount = () => {
    const url = 'https://opencollective.com/create-account?next=%2F'; // Replace with the URL you want to open
    Linking.openURL(url);
  };


  render() {
    const {theme} = this.props
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.backgroundPrimary,
          flex: 1,
        }}
      >
      <StatusBar backgroundColor={theme.mainTheme} barStyle="light-content" />
        <Image
          style={{ width: 100, height: 100, margin: 10 }}
          source={{
            uri:
              'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75',
          }}
        />
        <TouchableOpacity
          onPress={() => this.authenticate()}
          style={{
            backgroundColor: '#97b7f3',
            padding: 10,
            borderRadius: 15,
            margin: 15,
          }}
        >
          <Text style={{ color: 'white' }}>Login in to OpenCollective</Text>
        </TouchableOpacity>
        <View style={{alignContent:'center',justifyContent:'center',alignItems:'center',alignSelf:'center',padding:10}}>
        <Text style={{color:theme.textColor}}>Dont't have one ?</Text>
        <TouchableOpacity onPress={this.createAccount}>
          <Text style={{ color: theme.mainTheme, fontSize:20 }}>Create account</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default function ThemedLoginScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <LoginScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}