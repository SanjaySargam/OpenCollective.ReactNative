import React, { useEffect, useState } from 'react';
import { authorize, AuthorizeResult, ServiceConfiguration,refresh, revoke } from 'react-native-app-auth';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Alert, UIManager, LayoutAnimation } from 'react-native';
// import { Page, ButtonContainer, Form, Heading } from './components';

const config = {
  clientId: '601a11568b7504a9addb',
  redirectUrl: 'com.opencollective.dev:/callback',
  scopes: ["account"],
  serviceConfiguration: {
    authorizationEndpoint: 'https://opencollective.com/oauth/authorize',
    tokenEndpoint: 'https://opencollective.com/oauth/token',
  } as ServiceConfiguration, // Type assertion to ServiceConfiguration
};

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type State = {
  hasLoggedInOnce: boolean,
  accessToken: string,
  accessTokenExpirationDate: string,
  refreshToken: string
};



const OAuth: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //  = {
  //   hasLoggedInOnce: false,
  //   accessToken: '',
  //   accessTokenExpirationDate: '',
  //   refreshToken: ''
  // };

  const authenticate = async () => {
    try {
      const authResult: AuthorizeResult = await authorize(config);
      setAccessToken(authResult.accessToken);
      console.log("sanjsd",accessToken)
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // useEffect(() => {
  //   // Check for initial access token on app launch
  //   authenticate();
  // }, []);

  return (
    <View style={{backgroundColor:'#FFFFFF',flex:1}}>
      {accessToken!=null ? (
        <Text style={{fontSize:24,color:'black',justifyContent:'center',alignContent:'center'}}>Authenticated! Access Token: {accessToken}</Text>
      ) : (
        <TouchableOpacity onPress={authenticate}>
          <Text style={{fontSize:24,color:'black',justifyContent:'center',alignContent:'center'}}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OAuth;
