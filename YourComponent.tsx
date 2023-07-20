import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT, INDIVIDUAL, OWN_ACCOUNT } from './components/queries';
import { StyleSheet, Text, View } from 'react-native'; // Import the Text component from react-native


const YourComponent = () => {
  const slug = 'ankidroid'; // Replace with the desired slug value
  const { loading, error, data } = useQuery(GET_ACCOUNT,{
    variables:{
      slug:"sanjay-sargam"
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const { account } = data;

  return (
    <View>
      <Text style={styles.headingText}>ID: {account.id}</Text>
      <Text style={styles.headingText}>Name: {account.name}</Text>
      <Text style={styles.headingText}>Slug: {account.slug}</Text>
    </View>
  );
};
const styles=StyleSheet.create({
  headingText:{
    color:'black',
    fontWeight:'bold',
    alignSelf:'center',
    justifyContent:'center',
    fontSize:20
  }
})
export default YourComponent;
