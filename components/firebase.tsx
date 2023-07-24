import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const addUserDataWithAuthUid = async (email: string, name: string,id:string,slug:string) => {
  try {
    // Get the current authenticated user
    const currentUser = auth().currentUser;

    if (currentUser) {
      // Get the UID of the authenticated user
      const { uid } = currentUser;

      // Get a reference to the Firestore collection and the document with the UID as the document ID
      const documentRef = firestore().collection('USERS').doc(uid);

      // Add data to the document
      await documentRef.set({
        NAME: name,
        EMAIL: email,
        SLUG: slug,
        ID:id,
      });

      console.log('Data added to Firestore with Auth UID as document ID successfully!');
    } else {
      console.warn('User is not authenticated. Unable to add data to Firestore.');
    }
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
};

// Call the function to add data with Auth UID as document ID wherever needed

// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvuHnyL2agaM5Q0gYb_qwfaDOm1r8cAkI',
  authDomain: '<YOUR_AUTH_DOMAIN>',
  databaseURL: 'https://console.firebase.google.com/project/opencollective-8277f/database/opencollective-8277f-default-rtdb/data/~2F',
  projectId: 'opencollective-8277f',
  storageBucket: 'opencollective-8277f.appspot.com',
  messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
  appId: '1:806939464632:android:9979032f116c02becf754d',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
