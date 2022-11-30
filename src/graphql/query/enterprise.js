import { gql } from '@apollo/client';

export const GET_ALL_ENTERPRISES = gql`
  query getAllEnterprises {
    getAllEnterprises {
      id
      title
      marker {
        id
        value
        top
        left
        corner
      }
    }
  }
`;

export const GET_ONE_ENTERPRISE = gql`
  query getEnterprise($id: Int) {
    getEnterprise(id: $id) {
      id
      title
      logo
      description
      contacts
      vacancies {
        id
        vacancy
        requirements
        docs
        salary
        authorId
      }
      photos {
        id
        small
        large
        alt
        authorId
      }
      marker {
        id
        value
        top
        left
        corner
      }
    }
  }
`;
