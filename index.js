/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import HomePage from './components/HomePage';
import HomeScreen from './components/HomeScreen';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import OAuthScreen from './components/OAuthScreen';
import OAuth from './components/OAuth'
import Auth from './components/Auth';
import Auth2 from './components/Auth2';

AppRegistry.registerComponent(appName, () => App);
