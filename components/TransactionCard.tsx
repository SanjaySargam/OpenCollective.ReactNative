import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Transaction } from './fetchAPI';


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
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 3,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default TransactionCard;
