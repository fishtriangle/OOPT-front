import { gql } from '@apollo/client';

// export const CREATE_TRACK = gql``;

export const UPDATE_TRACK = gql`
  mutation UpdateTrack($data: TrackUpdateInput!) {
    updateTrack(data: $data) {
      description
      id
      length
      season
      timeInTrack
      title
      transport
      type
      water
    }
  }
`;

// export const DELETE_TRACK = gql``;
