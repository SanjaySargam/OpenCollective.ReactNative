/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from './ThemeProvider';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: false,
    };
  }

  componentDidMount() {
    this.loadStoredToken();
    // Simulate an asynchronous process, e.g., fetching data, before navigating to the main app.
    // setTimeout(() => {
    //     this.props.navigation.navigate('Login'); // Replace 'Main' with your main app screen's name
    // },5000); // Adjust the duration as needed (in milliseconds)
  }

  loadStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        this.setState({accessToken: true});
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error loading stored token:', error);
    }
  };
  render() {
    const {theme} = this.props;
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.backgroundPrimary,
          flex: 1,
        }}>
        <StatusBar backgroundColor="#97b7f3" barStyle="light-content" />
        <Image
          style={{width: 100, height: 100, margin: 10}}
          source={{
            uri: 'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75',
          }}
        />
      </View>
    );
  }
}

export default function ThemedSplashScreen(props) {
  const {theme, toggleTheme} = useTheme();
  return <SplashScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
