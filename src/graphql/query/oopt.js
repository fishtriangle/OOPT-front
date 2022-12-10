import { gql } from '@apollo/client';

export const GET_ALL_OOPTS = gql`
  query GetAllOOPTs {
    getAllOOPTs {
      id
      title
      description
      borders {
        id
        title
        axisX
        axisY
      }
    }
  }
`;

export const GET_OOPT = gql`
  query GetAllOOPTs($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      description
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
      towns {
        id
        title
        description
        stops {
          id
          title
          description
          route
        }
        axis {
          id
          title
          axisX
          axisY
        }
      }
      points {
        id
        title
        description
        route
      }
      tracks {
        id
        title
        description
        length
        type
        transport
        timeInTrack
        season
        water
      }
      borders {
        id
        title
        axisX
        axisY
      }
      masters {
        id
        title
        description
        contacts {
          id
          description
        }
      }
      services {
        id
        title
        description
      }
      holidays {
        id
        title
        description
      }
    }
  }
`;

export const GET_OOPT_DESCRIPTION = gql`
  query GetAllOOPTs($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      description
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

export const GET_OOPT_ABOUT = gql`
  query GetAllOOPTs($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      description
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

export const GET_OOPT_TRACKS = gql`
  query GetAllOOPTs($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      tracks {
        id
        title
        timeInTrack
        transport
        disabled
      }
    }
  }
`;

export const GET_OOPT_POINTS = gql`
  query GetOOPT($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      points {
        disabled
        id
        title
        description
        axis {
          id
          title
          axisX
          axisY
        }
      }
    }
  }
`;

export const GET_OOPT_TOWNS = gql`
  query GetOOPT($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      towns {
        id
        title
        disabled
      }
    }
  }
`;

export const GET_OOPT_MASTERS = gql`
  query GetOOPT($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      masters {
        id
        title
        disabled
      }
    }
  }
`;

export const GET_OOPT_SERVICES = gql`
  query GetOOPT($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      title
      services {
        id
        title
        disabled
      }
    }
  }
`;

export const GET_OOPT_HOLIDAYS = gql`
  query Query($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
      id
      holidays {
        id
        title
        disabled
      }
      title
    }
  }
`;

export const GET_OOPT_PHOTOS = gql`
  query GetAllOOPTs($ooptUniqueInput: OoptUniqueInput!) {
    getOOPT(ooptUniqueInput: $ooptUniqueInput) {
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
