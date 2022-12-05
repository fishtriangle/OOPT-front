import { gql } from '@apollo/client';

export const CREATE_TRACK = gql`
  mutation CreateTrack($data: TrackCreateInput!) {
    createTrack(data: $data) {
      description
      disabled
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

export const DELETE_TRACK = gql`
  mutation DeleteTrack($deleteTrackId: Float!) {
    deleteTrack(id: $deleteTrackId) {
      id
      disabled
      description
      length
      season
      timeInTrack
      title
      transport
      type
      water
      description
    }
  }
`;
