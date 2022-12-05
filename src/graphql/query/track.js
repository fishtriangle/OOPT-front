import { gql } from '@apollo/client';

export const GET_TRACK = gql`
  query GetTrack($trackUniqueInput: TrackUniqueInput!) {
    getTrack(trackUniqueInput: $trackUniqueInput) {
      id
      title
      description
      length
      axises {
        id
        title
        axisX
        axisY
      }
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
      stops {
        id
        title
        description
        route
        disabled
        axis {
          id
          title
          axisX
          axisY
        }
        photos {
          id
          small
          large
          description
          alt
        }
        videos {
          id
          path
          description
          alt
        }
      }
      type
      transport
      timeInTrack
      season
      water
    }
  }
`;

export const GET_TRACK_PHOTOS = gql`
  query GetTrack($trackUniqueInput: TrackUniqueInput!) {
    getTrack(trackUniqueInput: $trackUniqueInput) {
      id
      title
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;
