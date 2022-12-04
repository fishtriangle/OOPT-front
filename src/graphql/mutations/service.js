import { gql } from '@apollo/client';

// export const CREATE_SERVICE = gql``;

export const UPDATE_SERVICE = gql`
  mutation UpdateMaster($data: MasterUpdateInput!) {
    updateMaster(data: $data) {
      description
      id
      title
      contacts {
        description
        id
      }
    }
  }
`;

// export const DELETE_SERVICE = gql``;
