import { gql } from '@apollo/client';

export const GET_ALL_NEWS = gql`
  query getAllNews {
    getAllNews {
      date
      id
      title
    }
  }
`;

export const GET_ONE_NEWS = gql`
  query getNews($id: Int) {
    getNews(id: $id) {
      id
      date
      title
      description
      photos {
        id
        small
        large
        alt
        newsId
      }
    }
  }
`;
