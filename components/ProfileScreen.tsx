import { View, Text, StyleSheet, Image, TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import { logout } from './authService';
import { fetchAccountData} from './fetchAPI';
import {AuthContext} from './context'

const ProfileScreen:React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState<any | null>(null);
  const [error, setError] = useState('');
  const { signOut, toggleTheme } = React.useContext(AuthContext);

      useEffect(() => {
        fetchAccountData()
        .then((account) => {
          // Process the fetched account data as needed
          setAccountData(account)
          console.log('Fetched account data:', account);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching account data: ' + "error.message");
          setLoading(false);
        });
      },[])
         
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      {accountData ? (
        <View style={styles.container}>
        <Image source={{ uri: accountData.imageUrl }} style={styles.profilePicture} />
        <Text style={styles.username} onPress={() => {signOut()}}>{accountData.name}</Text>
        <Text style={styles.email}>sargamsanjaykumar@gmail.com</Text>
        <TouchableOpacity
          onPress={() => {
            // Open the GitHub profile link
            // You can use 'Linking' from 'react-native' to open the URL
          }}
        >
          <Text style={styles.githubProfile}>{accountData.repositoryUrl}</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
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
    color: '#333',
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
});


export default ProfileScreen