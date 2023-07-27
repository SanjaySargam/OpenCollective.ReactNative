import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getSlug = async(userId:string) => {
    try {
        const userRef = firestore().collection('USERS').doc(userId);
        const userSnapshot = await userRef.get();
    
        if (userSnapshot.exists) {
          // If the document exists, return the specified field value
          const fieldData = userSnapshot.get('slug');
          return fieldData;
        } else {
          // Document not found
          console.log(`User with ID ${userId} not found.`);
          return null;
        }
      } catch (error) {
        console.error('Error fetching field data:', error);
        return null;
      }
}