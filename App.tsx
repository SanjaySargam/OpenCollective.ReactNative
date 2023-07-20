import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import FlatCards from './components/FlatCards'
import ElevatedCards from './components/ElevatedCards'
import FancyCards from './components/FancyCards'
import ActionCard from './components/ActionCard'
import YourComponent from './YourComponent';
import SignUpPage from './components/SignUpPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.opencollective.com/graphql/v2/6b6604a2c9e0ed5459af4e38f1473c630251de5b',
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();


const App:React.FC = () => {
  return (
    // <SafeAreaView>
    //   <ScrollView>
    //   <FlatCards />
    //   <ElevatedCards/>
    //   <ActionCard/>
    //   </ScrollView>
    // </SafeAreaView>
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpPage">
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>

  )
}

export default App