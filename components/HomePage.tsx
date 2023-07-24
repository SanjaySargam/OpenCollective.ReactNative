import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './TransactionScreen';
import ExpenseScreen from './ExpenseScreen';
import ProfileScreen from './ProfileScreen';
import App from '../App';
import {useEffect,useState} from 'react'
import axios from 'axios';
const Tab = createBottomTabNavigator();
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';


export const HomePage =()=> {
    const [slug, setSlug] = useState('');
   const userId = firebase.auth().currentUser?.uid;
   console.log("USER ID",userId)
   useEffect(() => {
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
  }, []);
  console.log("sluggs",slug)

  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Transactions" component={TransactionScreen} />
      <Tab.Screen name="Expenses" component={ExpenseScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}

export default HomePage