import { gql } from '@apollo/client';

export const GET_MASTER = gql`
  query GetMaster($masterUniqueInput: MasterUniqueInput!) {
    getMaster(masterUniqueInput: $masterUniqueInput) {
      contacts {
        id
        description
      }
      description
      id
      photos {
        id
        small
        large
        description
        alt
      }
      title
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;

export const GET_MASTER_PHOTOS = gql`
  query GetMaster($masterUniqueInput: MasterUniqueInput!) {
    getMaster(masterUniqueInput: $masterUniqueInput) {
      id
      photos {
        id
        small
        large
        description
        alt
      }
      title
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;

export const GET_MASTER_CONTACTS = gql`
  query GetMaster($masterUniqueInput: MasterUniqueInput!) {
    getMaster(masterUniqueInput: $masterUniqueInput) {
      contacts {
        id
        description
      }
      id
      title
    }
  }
`;
