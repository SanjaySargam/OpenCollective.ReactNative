import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { signUp, login, logout, getCurrentUser } from './authService';
import { addUserDataWithAuthUid } from './firebase'
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT, OWN_ACCOUNT } from './queries';
import axios from 'axios';
import {fetchAccountData} from './fetchAPI'
import {storeSlug} from './AsyncStorage'
interface ScreenAProps {
  navigation: any;
}

const SignUpPage: React.FC<ScreenAProps> = ({ navigation })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [slug, setSlug] = useState('');

  const goToLoginPage = () => {
    navigation.navigate('LoginPage');
  };

  const goToHomePage = () => {
    navigation.navigate('HomePage');
  };

  const handleSignUp = async () => {

    try {
      const user = await signUp(email, password);
      const account = await fetchAccountData();
      // setAccountData(account);
      storeSlug(account.slug)
      console.log('Name', account.name);
      console.log('Id', account.id);
      console.log('Slug', account.slug);
      addUserDataWithAuthUid(email,account.name,account.id,account.slug,account.imageUrl,account.backgroundImageUrl,account.currency,account.description,account.longDescription,account.repositoryUrl)
      console.log('Signed up successfully!');
    } catch (error) {
      // setError(error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={
          {
            uri: 'https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Fopencollective-icon.png&w=48&q=75'
          }
        } style={styles.image} />
        <Text style={styles.title}>Create your personal account</Text>
        <Text style={styles.subtitle}>Set up your personal details to continue</Text>
        <Text style={styles.emailTitle}>Your email</Text>
        <TextInput
          style={styles.input}
          placeholder=" e.g., yourname@yourhost.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.emailTitle}>Your Open Collective username</Text>
        <TextInput
          style={styles.input}
          placeholder=" Enter username"
          value={slug}
          onChangeText={(text) => setSlug(text)}
        />
        <Text style={styles.emailTitle}>Set Password</Text>
        <TextInput
          style={styles.input}
          placeholder=" Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.emailTitle}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder=" Confirm password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create account and continue</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text style={styles.createAccountText} onPress={goToLoginPage}>Sign in</Text>
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 1.5,

  },
  footerText1: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center'
  },
  emailTitle: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8
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
    alignSelf: 'center'
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#b2d4f7',
    borderRadius: 20, // Adjust the value to change the corner radius
    padding: 12,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 45,
    color: 'black',
    alignSelf: 'center'
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
    alignSelf: 'center',

  },
  footerText: {
    marginRight: 5,
    alignSelf: 'center',
    marginBottom: 5,
    color: 'black',
  },
  createAccountText: {
    color: '#6297d9',
    alignSelf: 'center'
  },
});

export default SignUpPage