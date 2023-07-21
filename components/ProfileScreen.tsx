import { View, Text } from 'react-native'
import React from 'react'
import { logout } from './authService';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// type RootStackParamList = {
//   LoginPage: undefined;
// };

// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };

const ProfileScreen:React.FC = () => {
  // const goToLoginPage = () => {
  //   navigation.navigate('LoginPage');
  // };
  const navigation = useNavigation();

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
    <View>
      <Text onPress={handleLogout}>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen