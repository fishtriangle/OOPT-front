import { gql } from '@apollo/client';

export const DELETE_PHOTO = gql`
  mutation DeletePhoto($deletePhotoId: Float!) {
    deletePhoto(id: $deletePhotoId) {
      alt
      description
      id
      large
      small
    }
  }
`;
