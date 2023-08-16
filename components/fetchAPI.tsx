import axios from "axios";
import { GET_ACCOUNT, TRANSACTIONS, EXPENSES, ACCOUNT, BALANCE } from './queries'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSlug } from "./AsyncStorage";
import { } from './ExpenseScreen'
import { useEffect } from "react";

const BASE_URL = 'https://api.opencollective.com/graphql/v2'


export interface ApiResponse {
  data: {
    account: {
      name: string;
      slug: string;
      transactions: {
        totalCount: number;
        nodes: Transaction[];
      };
    };
  };
}
export interface Transaction {
  type: string;
  fromAccount: {
    name: string;
    slug: string;
    imageUrl: string;
  };
  toAccount: {
    slug:string
  };
  amount: {
    value: number;
    currency: string;
  };
  updatedAt: string;
  description: string;
}

export const fetchAccountData = async () => {
  try {
    const slug = 'sanjay-sargam'
    console.log("SANJAYD ", slug)
    const response = await axios.post(BASE_URL, {
      query: GET_ACCOUNT,
      variables: { slug },
    });

    if (response.data && response.data.data) {
      return response.data.data.account;
    } else {
      throw new Error('No data received.');
    }
  } catch (error) {
    throw new Error('Error fetching account data: ' + error);
  }
};

export const fetchTransactions = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await axios.post(BASE_URL, {
      query: TRANSACTIONS,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(response.data.data.loggedInAccount)
    if (response.data) {
      return response.data.data.loggedInAccount;
    } else {
      throw new Error('No data received.');
    }
  } catch (error) {
    throw new Error('Error fetching account data: ' + error);
  }
};
export const fetchAccount = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await axios.post(BASE_URL, {
      query: ACCOUNT,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('No data received.');
    }
  } catch (error) {
    throw new Error('Error fetching account data: ' + error);
  }
};
export const fetchExpenses = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken')
    const response = await axios.post(BASE_URL, {
      query: EXPENSES,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );

    if (response.data) {
      return response.data.data.loggedInAccount;
    } else {
      throw new Error('No data received.');
    }
  } catch (error) {
    throw new Error('Error fetching account data: ' + error);
  }
};

export const fetchBalance = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(BASE_URL, {
      query: BALANCE,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    if (response.data) {
      return response.data.data.loggedInAccount;
    } else {
      throw new Error('No data received.');
    }
  } catch (error) {
    throw new Error('Error fetching account data: ' + error);
  }
}