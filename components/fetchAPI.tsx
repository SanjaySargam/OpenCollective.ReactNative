import axios from "axios";
import {GET_ACCOUNT,TRANSACTIONS,EXPENSES} from './queries'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSlug } from "./AsyncStorage";
import {} from './ExpenseScreen'

const BASE_URL = 'https://api.opencollective.com/graphql/v2/6b6604a2c9e0ed5459af4e38f1473c630251de5b'

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
  };
  amount: {
    value: number;
    currency: string;
  };
  createdAt: string;
}

export const fetchAccountData = async () => {
    try {
      const slug = await getSlug()
      console.log("SANJAYD ",slug)
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
      const slug = await getSlug()
      console.log("SANJAYD ",slug)
      const response = await axios.post(BASE_URL, {
        query: TRANSACTIONS,
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

  export const fetchExpenses = async () => {
    try {
      const slug = await getSlug()
      console.log("SANJAYD ",slug)
      const response = await axios.post(BASE_URL, {
        query: EXPENSES,
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