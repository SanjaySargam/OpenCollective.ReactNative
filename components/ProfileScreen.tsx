import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import { logout } from './authService';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GET_CONTRIBUTOR_AT } from './queries';
import slug from './HomePage'
import auth from '@react-native-firebase/auth'; // Import the Firebase Authentication module
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';
import { fetchAccountData } from './fetchAPI';


interface ProfileScreenProps {
  profilePicture: string;
  username: string;
  email: string;
  githubProfile: string;
}

// type RootStackParamList = {
//   LoginPage: undefined;
// };

// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };



const ProfileScreen:React.FC = () => {
  const [userUid, setUserUid] = useState('');
  const [slug, setSlug] = useState('');
  const [accountData, setAccountData] = useState<any | null>(null);
   const userId = firebase.auth().currentUser?.uid;
   console.log("USER ID",userId)
   useEffect(()   => {
    // Replace with your Firebase configuration if you haven't already initialized Firebase
    // Fetch the user ID (UID) from Firebase Authentication
    if (!userId) {
      console.error('User not logged in!');
      return;
    }

    // Reference to the Firestore collection and document
    const collectionName = 'USERS'; // Use the UID as the collection name
    const documentId = userId; // Replace with the ID of your document
    const fieldToFetch = 'slug'; // Replace with the name of the field you want to fetch

    // Get a reference to the Firestore database
    const db = firebase.firestore();

    // Fetch the document
    db.collection(collectionName)
      .doc(documentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // If the document exists, get the field value and update the state
          const fieldValue = doc.get(fieldToFetch);
          console.log('fieldValue',fieldValue)
          setSlug(fieldValue as string);
          // console.log('SLUFY',slug)
        } else {
          console.log('Document not found!');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });

      if (slug) {
        fetchAccountData(slug)
          .then((account) => {
            // Process the fetched account data as needed
            setAccountData(account)
            // console.log('Fetched account data:', accountData);
          })
          .catch((error) => {
            console.error('Error fetching account data:', error);
          });
      }


  }, [slug]);
  console.log('Fetched account data:', accountData);
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