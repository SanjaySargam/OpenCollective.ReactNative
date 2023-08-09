import React, { useEffect, useState } from 'react';
import { authorize, AuthorizeResult, ServiceConfiguration } from 'react-native-app-auth';
import { View, Text, TouchableOpacity } from 'react-native';

const config = {
  clientId: '601a11568b7504a9addb',
  redirectUrl: 'https://opencollectiveandroid.com/',
  scopes: ['transactions'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://api.opencollective.com/oauth/authorize',
    tokenEndpoint: 'https://api.opencollective.com/oauth/token',
  } as ServiceConfiguration, // Type assertion to ServiceConfiguration
};

const OAuth: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const authenticate = async () => {
    try {
      const authResult: AuthorizeResult = await authorize(config);
      setAccessToken(authResult.accessToken);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  useEffect(() => {
    // Check for initial access token on app launch
    authenticate();
  }, []);

  return (
    <View>
      {accessToken ? (
        <Text>Authenticated! Access Token: {accessToken}</Text>
      ) : (
        <TouchableOpacity onPress={authenticate}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OAuth;
