import { TextLayer, IconLayer } from '@deck.gl/layers/typed';
import iconAtlas from './iconsmap.png';
import { ICON_MAPPING } from './variables';
import { useSelector } from 'react-redux';
import {
  selectCurrentLabel,
  setCurrentLabel,
} from '../../redux/slices/currentLabelSlice';
import { useAppDispatch } from '../../redux/store';

const otherData = [
  {
    name: 'Агинский ГОК',
    coordinates: [157.945204, 55.455107],
    marker: 'building',
  },
  {
    name: 'ГОК Шануч',
    coordinates: [157.220808, 55.285339],
    marker: 'building',
  },
  {
    name: 'г.Тарбаган',
    height: '1401 м',
    coordinates: [158.02574, 56.474305],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Будули',
    height: '1428 м',
    coordinates: [158.690637, 56.388294],
    marker: 'sleepingVolcano',
  },
  {
    name: 'г.Чемпура',
    height: '1417 м',
    coordinates: [159.1482, 56.233026],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Уксичан',
    height: '1700 м',
    coordinates: [158.385584, 56.064842],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Эбев-Бунаня',
    height: '1527 м',
    coordinates: [158.438284, 55.938885],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Южный Черпук',
    height: '1771 м',
    coordinates: [157.466697, 55.549442],
    marker: 'sleepingVolcano',
  },
  {
    name: 'Апапельские термальные источники',
    coordinates: [159.246089, 56.312056],
    marker: 'thermalSpring',
  },
  {
    name: 'Оксинские термальные источники',
    coordinates: [159.183056, 56.278389],
    marker: 'thermalSpring',
  },
  {
    name: '',
    coordinates: [159.088852, 56.017178],
    marker: 'thermalSpring',
  },
  {
    name: 'Уксичанские термальные источники',
    coordinates: [158.678735, 55.912204],
    marker: 'thermalSpring',
  },
  {
    name: 'Козыревские термальные источники',
    coordinates: [158.765833, 55.648022],
    marker: 'thermalSpring',
  },
];

const otherLayer = () => {
  const currentLabel = useSelector(selectCurrentLabel);
  const dispatch = useAppDispatch();

  const otherSigns = new IconLayer({
    id: 'other-signs-layer',
    data: otherData,
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
    onClick: (info) => {
      dispatch(setCurrentLabel(info.object));
    },
  });

  // const otherTexts = new TextLayer({
  //   id: 'other-text-layer',
  //   data: otherData,
  //   // pickable: true,
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
    otherSigns,
    otherTexts: null,
  };
};

export default otherLayer;
