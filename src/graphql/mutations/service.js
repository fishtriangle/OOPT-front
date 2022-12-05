import { gql } from '@apollo/client';

export const CREATE_SERVICE = gql`
  mutation Mutation($data: ServiceCreateInput!) {
    createService(data: $data) {
      id
      description
      title
      disabled
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($data: ServiceUpdateInput!) {
    updateService(data: $data) {
      id
      disabled
      description
      title
      contacts {
        description
        id
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation Mutation($deleteServiceId: Float!) {
    deleteService(id: $deleteServiceId) {
      id
      disabled
      description
      title
    }
  }
`;
