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
