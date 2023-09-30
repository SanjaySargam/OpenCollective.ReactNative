import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ThemeProvider, { useTheme } from './ThemeProvider';
import { fetchAccount } from './fetchAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT } from './queries';
import { darkTheme, lightTheme } from './themes';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: '',
      loggedInAccount: null,
    };
  }

  componentDidMount() {
    this.fetchLoggedInAccount();
  }

  fetchLoggedInAccount = async () => {
    try {
      const response = await fetchAccount();
      console.log("dshjf",response)
      this.setState({
        loggedInAccount: response.data.loggedInAccount,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  render() {
    const { theme, toggleTheme } = this.props;
    const { navigation } = this.props;
    const { loading, error, loggedInAccount } = this.state;

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.mainTheme,
        flex: 1
    },
    status: {
        backgroundColor: theme.mainTheme
    },
    toolbar: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 5,
    },
    name: {
        color: 'white',
        fontFamily: 'Mr Peter Bold',
        fontWeight:'bold'
    },
    welcomeText: {
        color: 'black'
    },
    tabView: {
        width: 'auto',
        height: 50
    },
    navigationContainer: {
        flex: 1,
    },
    icon: {
        color: theme.backgroundColor,
        fontSize: 30,
        margin: 8
    },
    iconContainer: {
        flexDirection: 'row'
    }
    });

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
        {loading && 
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        }
        {loggedInAccount &&
          <View style={styles.container}>
            <StatusBar backgroundColor={theme.mainTheme} barStyle="light-content" />
            <View style={styles.toolbar}>
              <TouchableOpacity>
                <Image source={{ uri: loggedInAccount.imageUrl }} style={styles.profilePic} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={styles.name}>{loggedInAccount.name}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={toggleTheme}>
                  <Icon name={theme === darkTheme ? 'light-mode' : 'dark-mode'} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                  <Icon name="notifications" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Ionicons name="settings" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.navigationContainer}>
              <TabNavigator />
            </View>
          </View>
        }
      </View>
    );
  }
}

export default function ThemedInfoScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <HomeScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}