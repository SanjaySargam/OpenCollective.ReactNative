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

AppRegistry.registerComponent(appName, () => App);
