import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signUp, login, logout, getCurrentUser } from './authService';

type Screen1Props = {
  navigation: any; // You can use the specific type from @react-navigation/native if available
};


const LoginPage:React.FC<Screen1Props> = ({ navigation }) => {
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');

  const goToSignUpPage = () => {
    navigation.navigate('SignUpPage');
  };

  const goToHomePage = () => {
    navigation.navigate('HomePage');
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      console.log('Logged in successfully!', user);
      goToHomePage
    } catch (error) {
      console.error('Error logging in:', "error.message");
    }
  };
  
  return (
    // <View>
  <View style={styles.container}>
      <Image source={
        {
          uri:'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75'
        }
      } style={styles.image} />
      <Text style={styles.title}>Continue with your email</Text>
      <Text style={styles.subtitle}>Sign in or create a personal account to continue</Text>
      <Text style={styles.emailTitle}>Your email address</Text>
      <TextInput
        style={styles.input}
        placeholder=" e.g., yourname@yourhost.com"
        value={email}
        onChangeText={(text) => getEmail(text)}

      />
      <Text style={styles.emailTitle}>Your Password</Text>
      <TextInput
        style={styles.input}
        placeholder=" Enter password"
        value={password}
        onChangeText={(text) => getPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have one?</Text>
        <Text style={styles.createAccountText} onPress={goToSignUpPage}>Create an account</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'flex-start',
    padding: 20,
    backgroundColor:'white'
  },
  footerContainer: {
    width:'100%',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'white',
    elevation:1.5,
    
  },
  footerText1: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf:'center'
  },
  emailTitle:{
    fontSize:12,
    color:'black',
    fontWeight:'bold',
    marginBottom:8
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    width:150,
    backgroundColor: '#b2d4f7',
    borderRadius: 20, // Adjust the value to change the corner radius
    padding: 12,
    alignSelf:'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 45,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'black'
  },
  footer: {
    flexDirection: 'column',
    marginTop: 20,
    alignSelf:'center',

  },
  footerText: {
    marginRight: 5,
    alignSelf:'center',
    marginBottom:5,
    color: 'black',
  },
  createAccountText: {
    color: '#6297d9',
    alignSelf:'center'
  },
});

export default LoginPage;
