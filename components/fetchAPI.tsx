import axios from 'axios';
import {
  GET_ACCOUNT,
  TRANSACTIONS,
  EXPENSES,
  ACCOUNT,
  BALANCE,
  PROFILE_DETAILS,
} from './queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.opencollective.com/graphql/v2';

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
    slug: string;
  };
  amount: {
    value: number;
    currency: string;
  };
  updatedAt: string;
  description: string;
}
export interface Profile {
  imageUrl: string;
  name: string;
  legalName: string;
  description: string;
  slug: string;
  currency: string;
  location: {
    country: string;
    structured: {
      city: string;
      zone: string;
      address1: string;
      address2: string;
      postalCode: string;
    };
  };
}

export const fetchAccountData = async () => {
  try {
    const slug = 'sanjay-sargam';
    console.log('SANJAYD ', slug);
    const response = await axios.post(BASE_URL, {
      query: GET_ACCOUNT,
      variables: {slug},
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
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(
      BASE_URL,
      {
        query: TRANSACTIONS,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
    );
    console.log(response.data.data.loggedInAccount);
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
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(
      BASE_URL,
      {
        query: ACCOUNT,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
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
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(
      BASE_URL,
      {
        query: EXPENSES,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
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
    const response = await axios.post(
      BASE_URL,
      {
        query: BALANCE,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
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

export const fetchProfileDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(
      BASE_URL,
      {
        query: PROFILE_DETAILS,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
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
