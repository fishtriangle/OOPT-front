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
    const maxY = _.max(data.axises.map(({ axisY }) => axisY));
    const minY = _.min(data.axises.map(({ axisY }) => axisY));
    const maxX = _.max(data.axises.map(({ axisX }) => axisX));
    const minX = _.min(data.axises.map(({ axisX }) => axisX));

    const axisY = ((maxY || 0) + (minY || 0)) / 2 / 1000000;
    const axisX = ((maxX || 0) + (minX || 0)) / 2 / 1000000;

    const zoom =
      (maxX || 0) - (minX || 0) < 78000
        ? 13
        : (maxX || 0) - (minX || 0) < 150000
        ? 12
        : (maxX || 0) - (minX || 0) < 250000
        ? 11
        : (maxX || 0) - (minX || 0) < 350000
        ? 10
        : 9;

    return {
      longitude: axisY + 0.08 * Math.pow(2, 13 - zoom),
      latitude: axisX + 0.008 * Math.pow(2, 13 - zoom),
      zoom,
      transitionDuration: 500,
    };
  }
  return {
    zoom: 13,
    transitionDuration: 500,
  };
};
