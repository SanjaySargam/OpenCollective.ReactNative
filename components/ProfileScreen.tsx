import { View, Text } from 'react-native'
import React from 'react'
import { logout } from './authService';

type Screen1Props = {
  navigation: any; // You can use the specific type from @react-navigation/native if available
};

const ProfileScreen:React.FC<Screen1Props> = ({ navigation }) => {
  const goToLoginPage = () => {
    navigation.navigate('LoginPage');
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Perform any additional actions after logout if needed
      console.log('Logged out successfully!');
      goToLoginPage
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