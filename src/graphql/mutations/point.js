import { gql } from '@apollo/client';

export const CREATE_POINT = gql`
  mutation CreatePoint($data: PointCreateInput!) {
    createPoint(data: $data) {
      description
      disabled
      id
      route
      title
    }
  }
`;

export const UPDATE_POINT = gql`
  mutation UpdatePoint($data: PointUpdateInput!) {
    updatePoint(data: $data) {
      description
      id
      route
      title
      disabled
    }
  }
`;

export const DELETE_POINT = gql`
  mutation DeletePoint($deletePointId: Float!) {
    deletePoint(id: $deletePointId) {
      description
      disabled
      id
      route
      title
    }
  }
`;
