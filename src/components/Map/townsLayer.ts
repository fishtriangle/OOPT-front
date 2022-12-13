import { TextLayer, IconLayer } from '@deck.gl/layers/typed';

import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  ITown,
} from '../../common/types';
import iconAtlas from './iconsmap.png';
import { ICON_MAPPING } from './variables';
import { useQuery } from '@apollo/client';
import { GET_OOPT_TOWNS } from '../../graphql/query/oopt';
import { createLayerData } from './utilities';
import { useSelector } from 'react-redux';
import {
  selectCurrentLabel,
  setCurrentLabel,
} from '../../redux/slices/currentLabelSlice';
import { useAppDispatch } from '../../redux/store';
import {
  hideBlock,
  selectDescriptionBlockIsHide,
  setBlockType,
  setCurrentTownId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { setCurrentViewState } from '../../redux/slices/currentViewStateSlice';

const townsLayer = (): { townSigns: any; townsTexts: any } => {
  const ooptIndex = 2;

  const currentLabel = useSelector(selectCurrentLabel);
  const isDescriptionHide = useSelector(selectDescriptionBlockIsHide);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_TOWNS,
    {
      variables: {
        pollInterval: 3000,
        ooptUniqueInput: { id: ooptIndex },
      },
    }
  );

  if (loading)
    return {
      townSigns: [],
      townsTexts: [],
    };

  if (error) {
    console.error(error);
    return {
      townSigns: [],
      townsTexts: [],
    };
  }

  const towns: ITown[] | undefined = data?.getOOPT.towns.filter(
    ({ disabled }) => !disabled
  );

  const townsData = towns?.map((town) => createLayerData(town));

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
        dispatch(setCurrentTownId(info.object.index));
        dispatch(setBlockType(EnumDescriptionBlock.TOWN));
        dispatch(showBlock());
      }, 1000);
    } else {
      dispatch(setCurrentTownId(info.object.index));
      dispatch(setBlockType(EnumDescriptionBlock.TOWN));
      dispatch(showBlock());
    }
  };

  const townSigns = new IconLayer({
    id: 'towns-signs-layer',
    data: townsData,
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
    onClick: (info) => onClick(info),
  });

  const townsTexts = new TextLayer({
    id: 'towns-text-layer',
    data: townsData,
    // pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => d.name,
    // updateTriggers: {
    //   getPosition: () => currentLabel?.coordinates,
    //   getText: () => currentLabel?.name,
    // },
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
    getColor: [255, 255, 255, 255],
  });

  return {
    townSigns,
    townsTexts,
  };
};

export default townsLayer;
