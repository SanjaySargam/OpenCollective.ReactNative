import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fetchAccount } from './fetchAPI';
import { AuthContext } from './context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from './ThemeProvider';
// import ArrowBack from '../assets/components/arror_back.png'

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      accountData: null,
      error: '',
    };
  }

  componentDidMount() {
    this.fetchLoggedInAccount()
  }

  fetchLoggedInAccount = async () => {
    try {
      const response = await fetchAccount();
      console.log("sanjay",response)
      this.setState({
        accountData: response.data.loggedInAccount,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        error: error.message,
      });
    }
  };
  render() {
    const {theme} = this.props
    const { loading, accountData, error } = this.state;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgroundPrimary,
      },
      toolbar: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#97b7f3',
        width: '100%',
      },
      icon: {
        fontSize: 30,
        color: theme.backgroundColor,
      },
      title: {
        color: theme.backgroundColor,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        flex: 1
      },
      profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      username: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.textColor,
      },
      email: {
        fontSize: 18,
        marginBottom: 5,
        color: '#666',
      },
      githubProfile: {
        fontSize: 18,
        color: '#007BFF',
        textDecorationLine: 'underline',
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
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile Screen</Text>
        </View>
        {/* {accountData ? ( */}
        <View style={styles.container}>
          {loading ? (
            <SkeletonPlaceholder>
              <View style={styles.profilePicture} />
            </SkeletonPlaceholder>
          ) : (
            <Image
              source={{uri: accountData.imageUrl}}
              style={styles.profilePicture}
            />
          )}
          {loading ? (
            <SkeletonPlaceholder>
              <View style={styles.username} />
            </SkeletonPlaceholder>
          ) : (
            <Text style={styles.username}>{accountData.name}</Text>
          )}
          {/* <Text style={styles.email}>sargamsanjaykumar@gmail.com</Text> */}
          <TouchableOpacity
            onPress={() => {
              // Open the GitHub profile link
              // You can use 'Linking' from 'react-native' to open the URL
            }}>
            {/* <Text style={styles.githubProfile}>{accountData.repositoryUrl}</Text> */}
          </TouchableOpacity>
        </View>
        {/* ) : (
          <Text>Loading...</Text>
        )} */}
      </View>
    );
  }
}

export default function ThemedOverviewScreen(props) {
  const { theme, toggleTheme } = useTheme();
  return <ProfileScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
