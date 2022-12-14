import { LineLayer, IconLayer, TextLayer } from '@deck.gl/layers/typed';

import { IGetTrack, IGetTrackVars, ITrack } from '../../common/types';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import {
  selectCurrentTrackId,
  selectDescriptionBlockIsHide,
} from '../../redux/slices/descriptionBlockSlice';
import { GET_TRACK } from '../../graphql/query/track';
import iconAtlas from './iconsmap.png';
import { ICON_MAPPING } from './variables';
import { createLayerData } from './utilities';
import {
  selectCurrentLabel,
  setCurrentLabel,
} from '../../redux/slices/currentLabelSlice';

interface ILinePoint {
  from: {
    coordinates: [number, number];
  };
  to: {
    coordinates: [number, number];
  };
  color: [number, number, number];
}

const tracksLayer = (): {
  trackSigns: any;
  trackTexts: any;
  trackLines: any;
} => {
  const ooptIndex = 2;
  const trackId = useSelector(selectCurrentTrackId);
  const dispatch = useAppDispatch();

  const currentLabel = useSelector(selectCurrentLabel);
  const isDescriptionHide = useSelector(selectDescriptionBlockIsHide);

  const { data, loading, error } = useQuery<IGetTrack, IGetTrackVars>(
    GET_TRACK,
    {
      variables: {
        pollInterval: 3000,
        trackUniqueInput: { id: trackId || 4 },
      },
    }
  );

  if (loading)
    return {
      trackSigns: null,
      trackTexts: null,
      trackLines: null,
    };

  if (error) {
    console.error(error);
    return {
      trackSigns: null,
      trackTexts: null,
      trackLines: null,
    };
  }

  const track: ITrack | undefined = data?.getTrack;

  const trackLinesData = track?.axises
    ? track?.axises.reduce((trackLines, axis, index, axises) => {
        if (index !== 0) {
          const trackLine: ILinePoint = {
            from: {
              coordinates: [
                (axises[index - 1].axisY || 0) / 1000000,
                (axises[index - 1].axisX || 0) / 1000000,
              ],
            },
            to: {
              coordinates: [
                (axis.axisY || 0) / 1000000,
                (axis.axisX || 0) / 1000000,
              ],
            },
            color: [180, 20, 20],
          };
          return [...trackLines, trackLine];
        } else {
          return [...trackLines];
        }
      }, [] as ILinePoint[])
    : [];

  const pointsData = track?.stops?.map((point) => {
    return createLayerData(point);
  });

  const onClick = (info: any) => {
    dispatch(setCurrentLabel(info.object));
  };

  const trackLines = new LineLayer({
    id: 'track-lines-layer',
    data: trackId ? trackLinesData : [],
    pickable: true,
    getWidth: 5,
    getSourcePosition: (d: any) => d.from.coordinates,
    getTargetPosition: (d: any) => d.to.coordinates,
    getColor: (d) => d.color,
  });

  const trackSigns = new IconLayer({
    id: 'track-signs-layer',
    data: trackId ? pointsData : [],
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
    onClick,
  });

  const trackTexts = new TextLayer({
    id: 'track-text-layer',
    data: trackId ? pointsData : [],
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    maxWidth: 1100,
    getPosition: () => currentLabel?.coordinates || [0, 0],
    getText: () => currentLabel?.name || '',
    updateTriggers: {
      getPosition: () => currentLabel?.coordinates,
      getText: () => currentLabel?.name,
    },
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
    getColor: [255, 255, 255, 255],
  });

  return {
    trackSigns: trackSigns,
    trackLines,
    trackTexts,
  };
};

export default tracksLayer;
