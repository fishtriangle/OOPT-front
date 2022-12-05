import { gql } from '@apollo/client';

export const CREATE_TOWN = gql`
  mutation CreateTown($data: TownCreateInput!) {
    createTown(data: $data) {
      description
      disabled
      id
      title
    }
  }
`;

export const UPDATE_TOWN = gql`
  mutation UpdateTown($data: TownUpdateInput!) {
    updateTown(data: $data) {
      id
      description
      title
    }
  }
`;

export const DELETE_TOWN = gql`
  mutation DeleteTown($deleteTownId: Float!) {
    deleteTown(id: $deleteTownId) {
      description
      disabled
      id
      title
    }
  }
`;
