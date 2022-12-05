import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($data: ContactCreateInput!) {
    createContact(data: $data) {
      description
      id
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($data: ContactUpdateInput!) {
    updateContact(data: $data) {
      description
      id
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($deleteContactId: Float!) {
    deleteContact(id: $deleteContactId) {
      description
      id
    }
  }
`;
