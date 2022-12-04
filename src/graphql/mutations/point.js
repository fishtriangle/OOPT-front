import { gql } from '@apollo/client';

// export const CREATE_POINT = gql``;

export const UPDATE_POINT = gql`
  mutation UpdatePoint($data: PointUpdateInput!) {
    updatePoint(data: $data) {
      description
      id
      route
      title
    }
  }
`;

// export const DELETE_POINT = gql``;
