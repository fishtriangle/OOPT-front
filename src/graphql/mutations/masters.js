import { gql } from '@apollo/client';

// export const CREATE_MASTER = gql``;

export const UPDATE_MASTER = gql`
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

// export const DELETE_MASTER = gql``;
