import {gql} from '@apollo/client';

export const GET_ACCOUNT = `
  query GetAccount($slug: String) {
    account(slug: $slug) {
      id
      name
      slug
      imageUrl
      backgroundImageUrl
      currency
      description
      longDescription
      repositoryUrl
    }
  }
`;

export const GET_CONTRIBUTOR_AT = gql`
  query account($slug: String) {
    account(slug: $slug) {
      name
      slug
      memberOf(role: CONTRIBUTOR) {
        totalCount
        nodes {
          account {
            name
            slug
          }
        }
      }
    }
  }
`;

export const BACKERS_OF_COLLECTIVE = gql`
  query account($slug: String) {
    account(slug: $slug) {
      name
      slug
      members(role: BACKER, limit: 100) {
        totalCount
        nodes {
          account {
            name
            slug
          }
        }
      }
    }
  }
`;

export const CONTRIBUTORS_OF_COLLECTIVE = gql`
  query account($slug: String) {
    account(slug: $slug) {
      name
      slug
      members(role: CONTRIBUTOR, limit: 100) {
        totalCount
        nodes {
          account {
            name
            slug
          }
        }
      }
    }
  }
`;

export const TRANSACTIONS = `
query loggedInAccount {
  loggedInAccount {
    name
    slug
    transactions(limit: 10, type: CREDIT) {
      totalCount
      nodes {
        type
        fromAccount {
          name
          imageUrl
        }
        toAccount{
          slug
        }
        amount {
          value
          currency
        }
        updatedAt
        description
      }
    }
  }
}`;

export const ACCOUNT = `
query loggedInAccount {
  loggedInAccount {
    id
    name
    slug
    email
    imageUrl
    repositoryUrl
  }
}
`;

export const EXPENSES = `
query loggedInAccount {
  loggedInAccount {
    name
    slug
    transactions(limit: 10, type: DEBIT) {
      totalCount
      nodes {
        type
        fromAccount {
          name
          imageUrl
        }
        toAccount{
          slug
        }
        amount {
          value
          currency
        }
        updatedAt
        description
      }
    }
  }
}`;

export const ADMINS_OF_COLLECTIVE = gql`
  query account($slug: String) {
    account(slug: $slug) {
      name
      slug
      members(role: ADMIN, limit: 100) {
        totalCount
        nodes {
          account {
            name
            slug
          }
        }
      }
    }
  }
`;

export const OWN_ACCOUNT = gql`
  query loggedInAccount {
    loggedInAccount {
      id
      name
      slug
    }
  }
`;

export const BALANCE = `
query loggedInAccount {
  loggedInAccount {
    type
    stats{
      balance{
        value
        currency
      }
      totalAmountSpent{
        value
        currency
      }
      totalNetAmountReceived{
        value
        currency
      }
      yearlyBudget{
        value
        currency
      }
    }
  }
}`;

export const PROFILE_DETAILS = `
query loggedInAccount {
  loggedInAccount {
    imageUrl
    name
    legalName
    description
    slug
    currency
    location{
      country
      structured
    }
  }
}`;
