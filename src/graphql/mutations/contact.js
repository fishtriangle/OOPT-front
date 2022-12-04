import { gql } from '@apollo/client';

// export const CREATE_CONTACT = gql``;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($data: ContactUpdateInput!) {
    updateContact(data: $data) {
      description
      id
    }
  }
`;

// export const DELETE_CONTACT = gql``;
