import { gql } from '@apollo/client';

// export const CREATE_TOWN = gql``;

export const UPDATE_TOWN = gql`
  mutation UpdateTown($data: TownUpdateInput!) {
    updateTown(data: $data) {
      id
      description
      title
    }
  }
`;

// export const DELETE_TOWN = gql``;
