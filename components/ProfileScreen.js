import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
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
      },
      goBack: {
        fontSize: 18,
        marginTop: 10,
        color: '#666',
      },
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

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text style={styles.goBack}>Go Back</Text>
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
