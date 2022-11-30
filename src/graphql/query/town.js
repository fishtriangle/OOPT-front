import { gql } from '@apollo/client';

export const GET_TOWN = gql`
  query GetTown($townUniqueInput: TownUniqueInput!) {
    getTown(townUniqueInput: $townUniqueInput) {
      id
      title
      description
      points {
        id
        title
        description
        route
      }
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
