// src/TabNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OverviewScreen from './OverviewScreen';
import TransactionScreen from './TransactionScreen';
import ExpenseScreen from './ExpenseScreen';
import {ScrollView} from 'react-native'
import TransactionCard from './TransactionCard';
// import ChatsScreen from './ChatsScreen';
// import StatusScreen from './StatusScreen';
// import CallsScreen from './CallsScreen';
import {useTheme} from './ThemeProvider'

const Tab = createMaterialTopTabNavigator();

const TabNavigator: React.FC = () => {
  const  {theme} = useTheme()
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{
            backgroundColor:theme.mainTheme,
            elevation:0,
            marginLeft:20,
            marginRight:20
        } ,
        tabBarIndicatorStyle:{
            backgroundColor:'white'
        },
        tabBarLabelStyle: {
            fontSize: 16, // Adjust the font size as per your requirement
            textTransform: 'none', // Prevents the text from being displayed in all caps
            padding: 0,// Add space between the tab bar indicator and the tab bar label
        },    
        // style: {
        //   backgroundColor: 'white', 
        // },
        // indicatorStyle: {
        //   backgroundColor: 'blue', 
        // },
      }}>
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Contribution" component={ExpenseScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
