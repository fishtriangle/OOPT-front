import { gql } from '@apollo/client';

// export const CREATE_OOPT = gql``;

export const UPDATE_OOPT = gql`
  mutation updateOOPT($data: OoptUpdateInput!) {
    updateOOPT(data: $data) {
      id
      title
      description
    }
  }
`;

// export const DELETE_OOPT = gql``;
