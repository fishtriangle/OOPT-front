export interface IPhoto {
  id: number;
  small?: string;
  large?: string;
  description?: string;
  alt?: string;
}

export interface IVideo {
  id: number;
  path?: string;
  description?: string;
  alt?: string;
}

export interface IHoliday {
  id: number;
  title?: string;
  description?: string;
  alt?: string;
  photos: IPhoto[];
  videos: IVideo[];
}

export interface IContact {
  id: number;
  description?: string;
}

export interface IService {
  id: number;
  title?: string;
  description?: string;
  photos: IPhoto[];
  videos: IVideo[];
  contacts: IContact[];
}

export interface IMaster {
  id: number;
  title?: string;
  description?: string;
  photos: IPhoto[];
  videos: IVideo[];
  contacts: IContact[];
}

export interface IAxis {
  id: number;
  title?: string;
  axisX: number;
  axisY: number;
}

export interface IPoint {
  id: number;
  title?: string;
  description?: string;
  axis: IAxis[];
  photos: IPhoto[];
  videos: IVideo[];
  route?: string;
}

export interface ITrack {
  id: number;
  title?: string;
  description?: string;
  length?: string;
  axises: IAxis[];
  photos: IPhoto[];
  videos: IVideo[];
  stops: IPoint[];
  type?: string;
  transport?: string;
  timeInTrack?: string;
  season?: string;
  water?: string;
}

export interface ITown {
  id: number;
  title?: string;
  description?: string;
  points: IPoint[];
  axis: IAxis[];
  photos: IPhoto[];
  videos: IVideo[];
}

export interface IOOPT {
  id: number;
  title?: string;
  description?: string;
  photos: IPhoto[];
  videos: IVideo[];
  towns: ITown[];
  points: IPoint[];
  tracks: ITrack[];
  borders: IAxis[];
  masters: IMaster[];
  services: IService[];
  holidays: IHoliday[];
}

export interface IMarker {
  id: number;
  value?: string;
  top?: number;
  left?: number;
  corner?: string;
}

export interface IGetOOPT {
  getOOPT: IOOPT;
}

export interface IGetOOPTVars {
  pollInterval: number;
  ooptUniqueInput: { id: number };
}

export interface IGetTrack {
  getTrack: ITrack;
}

export interface IGetTrackVars {
  pollInterval: number;
  trackUniqueInput: { id: number };
}

export interface IGetPoint {
  getPoint: IPoint;
}

export interface IGetPointVars {
  pollInterval: number;
  pointUniqueInput: { id: number };
}

export interface IGetTown {
  getTown: ITown;
}

export interface IGetTownVars {
  pollInterval: number;
  townUniqueInput: { id: number };
}

export interface IGetMaster {
  getMaster: IMaster;
}

export interface IGetMasterVars {
  pollInterval: number;
  masterUniqueInput: { id: number };
}

export interface IGetService {
  getService: IService;
}

export interface IGetServiceVars {
  pollInterval: number;
  serviceUniqueInput: { id: number };
}

export interface IEnterprise {
  id: number;
  title?: string;
  logo?: string;
  description?: string;
  contacts?: string;
  vacancies?: {
    id: number;
    vacancy?: string;
    requirements?: string;
    docs?: string;
    salary?: string;
    authorId?: number;
  }[];
  photos: IPhoto[];
  marker?: IMarker;
}

export interface IGetEnterprise {
  getEnterprise: IEnterprise;
}

export interface IGetEnterpriseVars {
  pollInterval: number;
  id: number;
}

export interface IInputPhoto {
  img: string | ArrayBuffer | null;
  alt?: string;
}

export interface IGetNews {
  getNews: {
    id: number;
    title?: string;
    date?: string;
    description?: string;
    photos: {
      id: number;
      small?: string;
      large?: string;
      alt?: string;
      authorId?: string;
    }[];
  };
}

export interface IGetNewsVars {
  pollInterval: number;
  id: number;
}

export enum EnumDescriptionBlock {
  ABOUT = 'about',
  TRACKS = 'tracks',
  TRACK = 'track',
  POINTS = 'points',
  POINT = 'point',
  TOWNS = 'towns',
  TOWN = 'town',
  MASTERS = 'masters',
  MASTER = 'master',
  SERVICE = 'service',
  SERVICE_ITEM = 'service_item',
}
