import { gql } from '@apollo/client';

export const CREATE_ENTERPRISE = gql`
  mutation createEnterprise($input: EnterpriseCreateInput) {
    createEnterprise(input: $input) {
      content
    }
  }
`;

export const UPDATE_ENTERPRISE = gql`
  mutation updateEnterprise($input: EnterpriseUpdateInput) {
    updateEnterprise(input: $input) {
      content
    }
  }
`;

export const DELETE_ENTERPRISE = gql`
  mutation deleteEnterprise($deleteEnterpriseId: Int!) {
    deleteEnterprise(id: $deleteEnterpriseId) {
      content
    }
  }
`;

export const DELETE_PHOTOS = gql`
  mutation deletePhotos($deletePhotosId: [Int]) {
    deletePhotos(id: $deletePhotosId) {
      content
    }
  }
`;
