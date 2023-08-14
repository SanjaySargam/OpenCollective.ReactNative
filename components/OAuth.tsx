import React, { useEffect, useState } from 'react';
import { authorize,ServiceConfiguration} from 'react-native-app-auth';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Alert, UIManager, LayoutAnimation } from 'react-native';

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
  } as ServiceConfiguration, // Type assertion to ServiceConfiguration
  skipCodeExchange: true,
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
  const handlePostRequest = async (code:string) => {
    const url = 'https://opencollective.com/oauth/token';
    const bodyParams = new URLSearchParams();
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('code',code);
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
        console.log(`data`,data)
        setAccessToken(data.access_token);
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const authenticate = async () => {
    try {
      const authResult = await authorize(config);

      console.log("authresult", authResult)
      // setAccessToken(authResult);
      // Make a POST request after authenticatio
      await handlePostRequest(authResult.authorizationCode)
      
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // useEffect(() => {
  //   // Check for initial access token on app launch
  //   authenticate();
  // }, []);

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      {accessToken != null ? (
        <Text style={{ fontSize: 24, color: 'black', justifyContent: 'center', alignContent: 'center' }}>Authenticated! Access Token: {accessToken}</Text>
      ) : (
        <TouchableOpacity onPress={authenticate}>
          <Text style={{ fontSize: 24, color: 'black', justifyContent: 'center', alignContent: 'center' }}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OAuth;
