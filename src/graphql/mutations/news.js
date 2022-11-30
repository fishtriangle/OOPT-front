import { gql } from '@apollo/client';

export const CREATE_NEWS = gql`
  mutation createNews($input: NewsCreateInput) {
    createNews(input: $input) {
      content
    }
  }
`;

export const UPDATE_NEWS = gql`
  mutation updateNews($input: NewsUpdateInput) {
    updateNews(input: $input) {
      content
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation deleteNews($deleteNewsId: Int!) {
    deleteNews(id: $deleteNewsId) {
      content
    }
  }
`;

export const DELETE_NEWS_PHOTO = gql`
  mutation deleteNewsPhoto($deleteNewsPhotosId: [Int]) {
    deleteNewsPhotos(id: $deleteNewsPhotosId) {
      content
    }
  }
`;
