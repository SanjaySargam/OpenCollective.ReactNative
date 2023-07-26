import axios from "axios";
import {GET_ACCOUNT,TRANSACTIONS,EXPENSES} from './queries'

const BASE_URL = 'https://api.opencollective.com/graphql/v2/6b6604a2c9e0ed5459af4e38f1473c630251de5b'

export const fetchAccountData = async (slug:string) => {
    try {
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

  export const fetchTransactions = async (slug:string) => {
    try {
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

  export const fetchExpenses = async (slug:string) => {
    try {
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