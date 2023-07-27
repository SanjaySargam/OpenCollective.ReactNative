import auth from '@react-native-firebase/auth';
import {deleteSlug} from './AsyncStorage'
// Sign up function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    deleteSlug('slug')
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

// Get the current authenticated user
export const getCurrentUser = () => {
  return auth().currentUser;
};
