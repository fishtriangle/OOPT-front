import { IMark, IPoint, ITown, ITrack, IViewState } from '../../common/types';
import _ from 'lodash';

const findIcon = (description?: string) => description?.split('/marker')[1];

export const createLayerData = (data: ITown | IPoint | null): IMark => {
  if (data) {
    const marker = findIcon(data.description);
    const axisX = (data.axis[0].axisX || 0) / 1000000;
    const axisY = (data.axis[0].axisY || 0) / 1000000;
    return {
      index: data.id,
      marker: marker || 'campfire',
      coordinates: [axisX, axisY],
      name: data.title,
    };
  }
  return {
    index: 0,
    marker: 'campfire',
    coordinates: [0, 0],
    name: '',
  };
};

export const createViewData = (data: ITown | IPoint | null): IViewState => {
  if (data) {
    const axisX = (data.axis[0].axisX || 0) / 1000000;
    const axisY = (data.axis[0].axisY || 0) / 1000000;
    return {
      longitude: axisX + 0.3,
      latitude: axisY + 0.04,
      zoom: 11,
      transitionDuration: 500,
    };
  }
  return {
    zoom: 11,
    transitionDuration: 500,
  };
};

export const createTrackViewData = (data: ITrack | null): IViewState => {
  if (data) {
    const axisX =
      _.sum(data.axises.map(({ axisX }) => axisX)) /
      data.axises.length /
      1000000;
    const axisY =
      _.sum(data.axises.map(({ axisY }) => axisY)) /
      data.axises.length /
      1000000;
    return {
      longitude: axisY + 0.08,
      latitude: axisX + 0.008,
      zoom: 13,
      transitionDuration: 500,
    };
  }
  return {
    zoom: 13,
    transitionDuration: 500,
  };
};
