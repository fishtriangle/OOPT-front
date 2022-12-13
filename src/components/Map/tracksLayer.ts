import { LineLayer } from '@deck.gl/layers/typed';

import {
  IGetOOPT,
  IGetOOPTVars,
  IGetTrack,
  IGetTrackVars,
  ITrack,
} from '../../common/types';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectCurrentTrackId } from '../../redux/slices/descriptionBlockSlice';
import { GET_TRACK } from '../../graphql/query/track';
import { GET_OOPT_TRACKS } from '../../graphql/query/oopt';

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
  console.log(track);
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

  console.log(trackLinesData);

  // const pointsData = points?.map((point) => createLayerData(point));
  //
  // const onClick = (info: any) => {
  //   dispatch(setCurrentLabel(info.object));
  //   const viewState = {
  //     longitude: info.object.coordinates[0] + 0.3,
  //     latitude: info.object.coordinates[1] + 0.04,
  //     zoom: 11,
  //     transitionDuration: 500,
  //   };
  //
  //   dispatch(setCurrentViewState(viewState));
  //
  //   if (!isDescriptionHide) {
  //     dispatch(hideBlock());
  //     setTimeout(() => {
  //       dispatch(setCurrentPointId(info.object.index));
  //       dispatch(setBlockType(EnumDescriptionBlock.POINT));
  //       dispatch(showBlock());
  //     }, 1000);
  //   } else {
  //     dispatch(setCurrentPointId(info.object.index));
  //     dispatch(setBlockType(EnumDescriptionBlock.POINT));
  //     dispatch(showBlock());
  //   }
  // };
  //
  const trackLines = new LineLayer({
    id: 'track-lines-layer',
    data: trackId ? trackLinesData : [],
    pickable: true,
    getWidth: 5,
    getSourcePosition: (d: any) => d.from.coordinates,
    getTargetPosition: (d: any) => d.to.coordinates,
    getColor: (d) => d.color,
  });
  //
  // const pointsTexts = new TextLayer({
  //   id: 'points-text-layer',
  //   data: pointsData,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: () => currentLabel?.coordinates || [0, 0],
  //   getText: () => currentLabel?.name || '',
  //   updateTriggers: {
  //     getPosition: () => currentLabel?.coordinates,
  //     getText: () => currentLabel?.name,
  //   },
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  //   getColor: [255, 255, 255, 255],
  // });

  return {
    trackSigns: null,
    trackLines,
    trackTexts: null,
  };
};

export default tracksLayer;
