import { TextLayer, IconLayer } from '@deck.gl/layers/typed';

import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IPoint,
  ITown,
} from '../../common/types';
import iconAtlas from './iconsmap.png';
import { ICON_MAPPING } from './variables';
import { useQuery } from '@apollo/client';
import { GET_OOPT_POINTS } from '../../graphql/query/oopt';
import { createLayerData } from './utilities';
import { useSelector } from 'react-redux';
import {
  selectCurrentLabel,
  setCurrentLabel,
} from '../../redux/slices/currentLabelSlice';
import { useAppDispatch } from '../../redux/store';
import {
  hideBlock,
  selectCurrentTrackId,
  selectDescriptionBlockIsHide,
  setBlockType,
  setCurrentPointId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { setCurrentViewState } from '../../redux/slices/currentViewStateSlice';

const pointsLayer = (): { pointsSigns: any; pointsTexts: any } => {
  const ooptIndex = 2;

  const currentLabel = useSelector(selectCurrentLabel);
  const currentTrackId = useSelector(selectCurrentTrackId);
  const isDescriptionHide = useSelector(selectDescriptionBlockIsHide);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_POINTS,
    {
      variables: {
        pollInterval: 3000,
        ooptUniqueInput: { id: ooptIndex },
      },
    }
  );

  if (loading)
    return {
      pointsSigns: [],
      pointsTexts: [],
    };

  if (error) {
    console.error(error);
    return {
      pointsSigns: [],
      pointsTexts: [],
    };
  }

  const points: IPoint[] | undefined = data?.getOOPT.points.filter(
    ({ disabled }) => !disabled
  );

  const pointsData =
    currentTrackId === 0 ? points?.map((point) => createLayerData(point)) : [];

  const onClick = (info: any) => {
    dispatch(setCurrentLabel(info.object));
    const viewState = {
      longitude: info.object.coordinates[0] + 0.3,
      latitude: info.object.coordinates[1] + 0.04,
      zoom: 11,
      transitionDuration: 500,
    };

    dispatch(setCurrentViewState(viewState));

    if (!isDescriptionHide) {
      dispatch(hideBlock());
      setTimeout(() => {
        dispatch(setCurrentPointId(info.object.index));
        dispatch(setBlockType(EnumDescriptionBlock.POINT));
        dispatch(showBlock());
      }, 1000);
    } else {
      dispatch(setCurrentPointId(info.object.index));
      dispatch(setBlockType(EnumDescriptionBlock.POINT));
      dispatch(showBlock());
    }
  };

  const pointsSigns = new IconLayer({
    id: 'points-signs-layer',
    data: pointsData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => (d.name === currentLabel?.name ? 95 : 65),
    updateTriggers: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getSize: (d) => (d.name === currentLabel?.name ? 95 : 65),
    },
    onClick,
  });

  const pointsTexts = new TextLayer({
    id: 'points-text-layer',
    data: pointsData,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
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
    pointsSigns,
    pointsTexts,
  };
};

export default pointsLayer;
