import { gql } from '@apollo/client';

export const GET_SERVICE = gql`
  query GetService($serviceUniqueInput: ServiceUniqueInput!) {
    getService(serviceUniqueInput: $serviceUniqueInput) {
      contacts {
        id
        description
      }
      id
      title
      description
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;

export const GET_SERVICE_PHOTOS = gql`
  query GetService($serviceUniqueInput: ServiceUniqueInput!) {
    getService(serviceUniqueInput: $serviceUniqueInput) {
      id
      title
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;

export const GET_SERVICE_CONTACTS = gql`
  query GetService($serviceUniqueInput: ServiceUniqueInput!) {
    getService(serviceUniqueInput: $serviceUniqueInput) {
      contacts {
        id
        description
      }
      id
      title
    }
  }
`;
