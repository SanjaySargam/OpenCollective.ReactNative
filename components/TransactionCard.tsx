import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transaction } from './fetchAPI';

export const colors = {
  heading: 'text-gray-700',
  button: '#50C878'
}
export const categoryBG = {
  food: '#E1D3EE',
  commute: '#B0E3D3',
  shopping: '#EcFAD7',
  entertainment: '#ffdfdd',
  other: '#CAD309'
}
const TransactionCard: React.FC<Transaction> = ({
  type,
  fromAccount:{
    name,
    imageUrl
  },
  toAccount:{
    slug
  },
  amount:{
    value,
    currency
  },
  updatedAt,
  description
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.profilePic} />
      <View style={styles.content}>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.subtitle}>Credited From: {name}</Text>
        <Text style={styles.subtitle}>Credited To: {slug}</Text>
        <Text style={styles.subtitle}>Date: {updatedAt}</Text>
        <Text style={styles.amount}>Amount: ${value}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b2d4f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin:8,
    paddingHorizontal: 5,
    marginBottom: 3,
    borderRadius: 20,
  },
  profilePicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin:8
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.heading, 
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 3,
    color: 'black',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TransactionCard;
