import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import { logout } from './authService';
import { fetchAccountData} from './fetchAPI';

const ProfileScreen:React.FC = () => {

  const [accountData, setAccountData] = useState<any | null>(null);

      useEffect(() => {
        fetchAccountData()
        .then((account) => {
          // Process the fetched account data as needed
          setAccountData(account)
          console.log('Fetched account data:', account);
        })
        .catch((error) => {
          console.error('Error fetching account data:', error);
        });
      },[])
         
  const handleLogout = async () => {
    try {
      await logout();
      // Perform any additional actions after logout if needed
      console.log('Logged out successfully!');
      // goToLoginPage
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      {accountData ? (
        <View style={styles.container}>
        <Image source={{ uri: accountData.imageUrl }} style={styles.profilePicture} />
        <Text style={styles.username} onPress={handleLogout}>{accountData.name}</Text>
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