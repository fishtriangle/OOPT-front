import { gql } from '@apollo/client';

export const CREATE_MASTER = gql`
  mutation Mutation($data: MasterCreateInput!) {
    createMaster(data: $data) {
      id
      description
      title
      disabled
    }
  }
`;

export const UPDATE_MASTER = gql`
  mutation UpdateMaster($data: MasterUpdateInput!) {
    updateMaster(data: $data) {
      id
      title
      description
      disabled
    }
  }
`;

export const DELETE_MASTER = gql`
  mutation Mutation($deleteMasterId: Float!) {
    deleteMaster(id: $deleteMasterId) {
      id
      disabled
      description
      title
    }
  }
`;
