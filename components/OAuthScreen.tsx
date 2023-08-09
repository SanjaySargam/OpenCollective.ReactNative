import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const OAuthScreen: React.FC = () => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  var authorizationUrl=''
  const handleLogin = () => {
    // Your OAuth settings
    const clientId = '601a11568b7504a9addb';
    const redirectUri = 'https://opencollectiveandroid.com/';
    const scope = 'transactions'; // Replace with the requested scope

    // Construct the authorization URL
    authorizationUrl = `https://api.opencollective.com/oauth/authorize?client_id=${clientId}&redirectop_uri=${redirectUri}&scope=${scope}&response_type=code`;
    console.log("Authorization",authorizationUrl)
    setIsWebViewVisible(true);
  };

  const handleWebViewNavigationStateChange = async (newNavState: any) => {
    const { url } = newNavState;
  
    // Check if the URL contains the redirectUri
    if (url.startsWith('https://opencollectiveandroid.com/')) {
      // Parse the authorization code from the URL
      const authorizationCode = new URL(url).searchParams.get('code');
      console.log("Auth Code",authorizationCode)
      // Exchange the authorization code for an access token
      try {
        const tokenResponse = await axios.post(
          'https://api.opencollective.com/oauth/token',
          {
            client_id: '601a11568b7504a9addb',
            client_secret: 'ed441c54424d997d27ee9d64d73b3bdf08143c4c',
            code: authorizationCode,
            grant_type: 'authorization_code',
            redirect_uri: 'https://opencollectiveandroid.com/',
          }
        );
  
        // Access token is available in tokenResponse.data.access_token
        const accessToken = tokenResponse.data.access_token;
        console.log("Token",tokenResponse)
        // TODO: Use the access token to make authenticated API requests
  
        setIsWebViewVisible(false);
      } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
      }
    }
  };

  return (
    <View>
      <Button title="Login" onPress={handleWebViewNavigationStateChange} />
      {isWebViewVisible && (
        <WebView
          source={{ uri: authorizationUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
    </View>
  );
};

export default OAuthScreen;
