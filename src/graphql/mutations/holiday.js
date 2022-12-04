import { gql } from '@apollo/client';

// export const CREATE_HOLIDAY = gql``;

export const UPDATE_HOLIDAY = gql`
  mutation updateOOPT($data: OoptUpdateInput!) {
    updateOOPT(data: $data) {
      id
      title
      description
    }
  }
`;

// export const DELETE_HOLIDAY = gql``;
