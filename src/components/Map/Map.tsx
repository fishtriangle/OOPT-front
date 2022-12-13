import React from 'react';
import DeckGL from '@deck.gl/react/typed';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TileLayer } from 'deck.gl';
import borders from './bordersLayer';
import { LATITUDE_RANGE, LONGITUDE_RANGE } from './variables';
import townsLayer from './townsLayer';
import otherLayer from './otherLayer';
import { useSelector } from 'react-redux';
import { selectCurrentViewState } from '../../redux/slices/currentViewStateSlice';
import pointsLayer from './pointsLayer';
import tracksLayer from './tracksLayer';
import bitmapLayers from './tilesLayer';

const trackIkarData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.706086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.700086, 55.880238],
    },
    to: {
      coordinates: [158.698186, 55.872238],
    },
  },
  {
    from: {
      coordinates: [158.698186, 55.872238],
    },
    to: {
      coordinates: [158.692186, 55.868238],
    },
  },
  {
    from: {
      coordinates: [158.692186, 55.868238],
    },
    to: {
      coordinates: [158.684086, 55.868238],
    },
  },
  {
    from: {
      coordinates: [158.684086, 55.868238],
    },
    to: {
      coordinates: [158.680086, 55.864238],
    },
  },
  {
    from: {
      coordinates: [158.680086, 55.864238],
    },
    to: {
      coordinates: [158.674086, 55.864238],
    },
  },
];
const pointsIkarData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.701616, 55.883238],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.706086, 55.892238],
    marker: 'campfire',
  },
  {
    name: 'беседка Летний стан',
    coordinates: [158.698186, 55.872238],
    marker: 'campfire',
  },
  {
    name: 'беседка Икар',
    coordinates: [158.674086, 55.864238],
    marker: 'campfire',
  },
];

const trackDimchikhanskiyData = [
  {
    from: {
      coordinates: [158.700986, 55.918538],
    },
    to: {
      coordinates: [158.6894, 55.891333],
    },
  },
  {
    from: {
      coordinates: [158.6894, 55.891333],
    },
    to: {
      coordinates: [158.6653, 55.879283],
    },
  },
  {
    from: {
      coordinates: [158.6653, 55.879283],
    },
    to: {
      coordinates: [158.65925, 55.8638],
    },
  },
  {
    from: {
      coordinates: [158.65925, 55.8638],
    },
    to: {
      coordinates: [158.643052, 55.845483],
    },
  },
];
const pointsDimchikhanskiyData = [
  {
    name: 'беседка Улавкавчан',
    coordinates: [158.6894, 55.891333],
    marker: 'campfire',
  },
  {
    name: 'беседка Горгочан',
    coordinates: [158.6653, 55.879283],
    marker: 'campfire',
  },
  {
    name: 'смотровая на перевале Горгочан',
    coordinates: [158.65925, 55.8638],
    marker: 'campfire',
  },
  {
    name: 'кордон Димшиканский',
    coordinates: [158.643052, 55.845483],
    marker: 'house',
  },
];

const trackBlackCastleData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.706086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.706086, 55.892238],
    },
    to: {
      coordinates: [158.700086, 55.880238],
    },
  },
  {
    from: {
      coordinates: [158.700086, 55.880238],
    },
    to: {
      coordinates: [158.698186, 55.872238],
    },
  },
  {
    from: {
      coordinates: [158.698186, 55.872238],
    },
    to: {
      coordinates: [158.701186, 55.867238],
    },
  },
  {
    from: {
      coordinates: [158.701186, 55.867238],
    },
    to: {
      coordinates: [158.695186, 55.866238],
    },
  },
  {
    from: {
      coordinates: [158.695186, 55.866238],
    },
    to: {
      coordinates: [158.690186, 55.858238],
    },
  },
  {
    from: {
      coordinates: [158.690186, 55.858238],
    },
    to: {
      coordinates: [158.691186, 55.855838],
    },
  },
  /// point
  {
    from: {
      coordinates: [158.691186, 55.855838],
    },
    to: {
      coordinates: [158.694722, 55.840333],
    },
  },
  {
    from: {
      coordinates: [158.694722, 55.840333],
    },
    to: {
      coordinates: [158.702722, 55.827333],
    },
  },
  {
    from: {
      coordinates: [158.702722, 55.827333],
    },
    to: {
      coordinates: [158.708722, 55.827333],
    },
  },
  {
    from: {
      coordinates: [158.708722, 55.827333],
    },
    to: {
      coordinates: [158.708111, 55.8305],
    },
  },
];
const pointsBlackCastleData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.706086, 55.892238],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.701616, 55.883238],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Летний стан',
    coordinates: [158.698186, 55.872238],
    marker: 'campfire',
  },
  {
    name: 'Беседка',
    coordinates: [158.694722, 55.840333],
    marker: 'campfire',
  },
  {
    name: 'Черный замок',
    coordinates: [158.708111, 55.8305],
    marker: 'naturePoint',
  },
];

const trackIlmaganLakeData = [
  {
    from: {
      coordinates: [158.700986, 55.918538],
    },
    to: {
      coordinates: [158.756711, 55.966711],
    },
  },
  {
    from: {
      coordinates: [158.756711, 55.966711],
    },
    to: {
      coordinates: [158.810711, 56.00711],
    },
  },
  {
    from: {
      coordinates: [158.810711, 56.00711],
    },
    to: {
      coordinates: [158.880011, 56.02711],
    },
  },
  {
    from: {
      coordinates: [158.880011, 56.02711],
    },
    to: {
      coordinates: [158.918011, 56.04711],
    },
  },
  {
    from: {
      coordinates: [158.918011, 56.04711],
    },
    to: {
      coordinates: [158.938011, 56.04911],
    },
  },
  {
    from: {
      coordinates: [158.938011, 56.04911],
    },
    to: {
      coordinates: [158.93476, 56.070151],
    },
  },
  {
    from: {
      coordinates: [158.93476, 56.070151],
    },
    to: {
      coordinates: [158.946176, 56.084068],
    },
  },
  {
    from: {
      coordinates: [158.946176, 56.084068],
    },
    to: {
      coordinates: [158.931185, 56.11279],
    },
  },
  {
    from: {
      coordinates: [158.931185, 56.11279],
    },
    to: {
      coordinates: [158.925061, 56.120269],
    },
  },
  {
    from: {
      coordinates: [158.925061, 56.120269],
    },
    to: {
      coordinates: [158.92283, 56.132156],
    },
  },
  {
    from: {
      coordinates: [158.92283, 56.132156],
    },
    to: {
      coordinates: [158.912187, 56.143416],
    },
  },
  {
    from: {
      coordinates: [158.912187, 56.143416],
    },
    to: {
      coordinates: [158.905063, 56.14471],
    },
  },
  {
    from: {
      coordinates: [158.905063, 56.14471],
    },
    to: {
      coordinates: [158.880343, 56.166741],
    },
  },
  {
    from: {
      coordinates: [158.880343, 56.166741],
    },
    to: {
      coordinates: [158.856397, 56.188041],
    },
  },
  {
    from: {
      coordinates: [158.856397, 56.188041],
    },
    to: {
      coordinates: [158.874222, 56.194072],
    },
  },
];
const pointsIlmaganLakeData = [
  {
    name: 'беседка Илмаган',
    coordinates: [],
    marker: 'campfire',
  },
];

const trackSnowbordingCanyonData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.723086, 55.902238],
    },
  },
  {
    from: {
      coordinates: [158.723086, 55.902238],
    },
    to: {
      coordinates: [158.725086, 55.894238],
    },
  },
  {
    from: {
      coordinates: [158.725086, 55.894238],
    },
    to: {
      coordinates: [158.733086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.733086, 55.892238],
    },
    to: {
      coordinates: [158.747086, 55.892938],
    },
  },
  {
    from: {
      coordinates: [158.747086, 55.892938],
    },
    to: {
      coordinates: [158.751786, 55.897438],
    },
  },
  {
    from: {
      coordinates: [158.751786, 55.897438],
    },
    to: {
      coordinates: [158.753056, 55.895533],
    },
  },
  {
    from: {
      coordinates: [158.753056, 55.895533],
    },
    to: {
      coordinates: [158.772456, 55.902533],
    },
  },
  {
    from: {
      coordinates: [158.772456, 55.902533],
    },
    to: {
      coordinates: [158.808556, 55.894944],
    },
  },
  {
    from: {
      coordinates: [158.808556, 55.894944],
    },
    to: {
      coordinates: [158.744078, 55.9085],
    },
  },
  {
    from: {
      coordinates: [158.744078, 55.9085],
    },
    to: {
      coordinates: [158.738086, 55.904838],
    },
  },
  {
    from: {
      coordinates: [158.738086, 55.904838],
    },
    to: {
      coordinates: [158.736086, 55.909838],
    },
  },
  {
    from: {
      coordinates: [158.736086, 55.909838],
    },
    to: {
      coordinates: [158.726986, 55.915038],
    },
  },
];
const pointsSnowbordingCanyonData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка г. Левая',
    coordinates: [158.763817, 55.899423],
    marker: 'campfire',
  },
  {
    name: 'домик Сноубордистов',
    coordinates: [158.808556, 55.894944],
    marker: 'house',
  },
];

const trackVulcashikiData = [
  {
    from: {
      coordinates: [158.700986, 55.918538],
    },
    to: {
      coordinates: [158.69275, 55.923293],
    },
  },
  {
    from: {
      coordinates: [158.69275, 55.923293],
    },
    to: {
      coordinates: [158.686227, 55.928147],
    },
  },
  {
    from: {
      coordinates: [158.686227, 55.928147],
    },
    to: {
      coordinates: [158.687527, 55.929147],
    },
  },
  {
    from: {
      coordinates: [158.687527, 55.929147],
    },
    to: {
      coordinates: [158.681527, 55.934347],
    },
  },
  {
    from: {
      coordinates: [158.681527, 55.934347],
    },
    to: {
      coordinates: [158.680498, 55.937267],
    },
  },
  {
    from: {
      coordinates: [158.680498, 55.937267],
    },
    to: {
      coordinates: [158.670327, 55.938857],
    },
  },
  {
    from: {
      coordinates: [158.670327, 55.938857],
    },
    to: {
      coordinates: [158.666336, 55.940229],
    },
  },
  {
    from: {
      coordinates: [158.666336, 55.940229],
    },
    to: {
      coordinates: [158.657336, 55.937529],
    },
  },
  {
    from: {
      coordinates: [158.657336, 55.937529],
    },
    to: {
      coordinates: [158.650336, 55.940529],
    },
  },
  {
    from: {
      coordinates: [158.650336, 55.940529],
    },
    to: {
      coordinates: [158.649336, 55.943329],
    },
  },
  {
    from: {
      coordinates: [158.649336, 55.943329],
    },
    to: {
      coordinates: [158.645536, 55.947329],
    },
  },
  {
    from: {
      coordinates: [158.645536, 55.947329],
    },
    to: {
      coordinates: [158.620536, 55.951829],
    },
  },
  {
    from: {
      coordinates: [158.620536, 55.951829],
    },
    to: {
      coordinates: [158.613036, 55.952429],
    },
  },
  {
    from: {
      coordinates: [158.613036, 55.952429],
    },
    to: {
      coordinates: [158.594036, 55.960029],
    },
  },
  {
    from: {
      coordinates: [158.594036, 55.960029],
    },
    to: {
      coordinates: [158.596036, 55.973029],
    },
  },
  {
    from: {
      coordinates: [158.596036, 55.973029],
    },
    to: {
      coordinates: [158.607, 55.971529],
    },
  },
  {
    from: {
      coordinates: [158.607, 55.971529],
    },
    to: {
      coordinates: [158.612, 55.973029],
    },
  },
  {
    from: {
      coordinates: [158.612, 55.973029],
    },
    to: {
      coordinates: [158.6142, 55.974729],
    },
  },
  /// vulcashiki
  {
    from: {
      coordinates: [158.6142, 55.974729],
    },
    to: {
      coordinates: [158.613611, 55.978111],
    },
  },
  {
    from: {
      coordinates: [158.613611, 55.978111],
    },
    to: {
      coordinates: [158.623611, 55.975011],
    },
  },
  {
    from: {
      coordinates: [158.623611, 55.975011],
    },
    to: {
      coordinates: [158.627611, 55.973511],
    },
  },
  {
    from: {
      coordinates: [158.627611, 55.973511],
    },
    to: {
      coordinates: [158.642611, 55.971511],
    },
  },
  {
    from: {
      coordinates: [158.642611, 55.971511],
    },
    to: {
      coordinates: [158.693511, 55.992011],
    },
  },
  {
    from: {
      coordinates: [158.693511, 55.992011],
    },
    to: {
      coordinates: [158.707511, 55.993011],
    },
  },
  {
    from: {
      coordinates: [158.707511, 55.993011],
    },
    to: {
      coordinates: [158.715511, 55.995711],
    },
  },
  {
    from: {
      coordinates: [158.715511, 55.995711],
    },
    to: {
      coordinates: [158.727511, 55.984711],
    },
  },
  {
    from: {
      coordinates: [158.727511, 55.984711],
    },
    to: {
      coordinates: [158.754711, 55.982711],
    },
  },
  {
    from: {
      coordinates: [158.754711, 55.982711],
    },
    to: {
      coordinates: [158.756711, 55.966711],
    },
  },
  {
    from: {
      coordinates: [158.756711, 55.966711],
    },
    to: {
      coordinates: [158.700986, 55.918538],
    },
  },
];
const pointsVulcashikiData = [
  {
    name: 'вагончик Вулкашики',
    coordinates: [158.613611, 55.978111],
    marker: 'house',
  },
  {
    name: 'Вулкан',
    coordinates: [158.618611, 55.980111],
    marker: 'sleepingVolcano',
  },
  {
    name: 'Вулкан',
    coordinates: [158.608011, 55.974511],
    marker: 'sleepingVolcano',
  },
];

const trackDigirenOlegendeData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.706086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.706086, 55.892238],
    },
    to: {
      coordinates: [158.700086, 55.880238],
    },
  },
  {
    from: {
      coordinates: [158.700086, 55.880238],
    },
    to: {
      coordinates: [158.698186, 55.872238],
    },
  },
  {
    from: {
      coordinates: [158.698186, 55.872238],
    },
    to: {
      coordinates: [158.701186, 55.867238],
    },
  },
  {
    from: {
      coordinates: [158.701186, 55.867238],
    },
    to: {
      coordinates: [158.713586, 55.856238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.856238],
    },
    to: {
      coordinates: [158.713586, 55.852238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.852238],
    },
    to: {
      coordinates: [158.720586, 55.8495],
    },
  },
  {
    from: {
      coordinates: [158.720586, 55.8495],
    },
    to: {
      coordinates: [158.753586, 55.836],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.753586, 55.836],
    },
    to: {
      coordinates: [158.803944, 55.821333],
    },
  },
  {
    from: {
      coordinates: [158.803944, 55.821333],
    },
    to: {
      coordinates: [158.821944, 55.829333],
    },
  },
  {
    from: {
      coordinates: [158.821944, 55.829333],
    },
    to: {
      coordinates: [158.824944, 55.841733],
    },
  },
  {
    from: {
      coordinates: [158.824944, 55.841733],
    },
    to: {
      coordinates: [158.819584, 55.8443],
    },
  },
];
const pointsDigirenOlegendeData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.706086, 55.892238],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.701616, 55.883238],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Летний стан',
    coordinates: [158.698186, 55.872238],
    marker: 'campfire',
  },
  {
    name: 'беседка Нюлкин',
    coordinates: [158.713586, 55.856238],
    marker: 'campfire',
  },
  {
    name: 'домик Альпийский',
    coordinates: [158.803944, 55.821333],
    marker: 'house',
  },
];

const trackSinegorieData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.706086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.706086, 55.892238],
    },
    to: {
      coordinates: [158.700086, 55.880238],
    },
  },
  {
    from: {
      coordinates: [158.700086, 55.880238],
    },
    to: {
      coordinates: [158.698186, 55.872238],
    },
  },
  {
    from: {
      coordinates: [158.698186, 55.872238],
    },
    to: {
      coordinates: [158.701186, 55.867238],
    },
  },
  {
    from: {
      coordinates: [158.701186, 55.867238],
    },
    to: {
      coordinates: [158.713586, 55.856238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.856238],
    },
    to: {
      coordinates: [158.713586, 55.852238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.852238],
    },
    to: {
      coordinates: [158.720586, 55.8495],
    },
  },
  {
    from: {
      coordinates: [158.720586, 55.8495],
    },
    to: {
      coordinates: [158.753586, 55.836],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.753586, 55.836],
    },
    to: {
      coordinates: [158.803944, 55.821333],
    },
  },
  {
    from: {
      coordinates: [158.803944, 55.821333],
    },
    to: {
      coordinates: [158.803944, 55.859333],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.803944, 55.859333],
    },
    to: {
      coordinates: [158.817944, 55.875333],
    },
  },
  {
    from: {
      coordinates: [158.817944, 55.875333],
    },
    to: {
      coordinates: [158.817944, 55.886333],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.817944, 55.886333],
    },
    to: {
      coordinates: [158.808556, 55.894944],
    },
  },
  {
    from: {
      coordinates: [158.808556, 55.894944],
    },
    to: {
      coordinates: [158.744078, 55.9085],
    },
  },
  {
    from: {
      coordinates: [158.744078, 55.9085],
    },
    to: {
      coordinates: [158.738086, 55.904838],
    },
  },
  {
    from: {
      coordinates: [158.738086, 55.904838],
    },
    to: {
      coordinates: [158.736086, 55.909838],
    },
  },
  {
    from: {
      coordinates: [158.736086, 55.909838],
    },
    to: {
      coordinates: [158.726986, 55.915038],
    },
  },
];
const pointsSinegorieData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.706086, 55.892238],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.701616, 55.883238],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Летний стан',
    coordinates: [158.698186, 55.872238],
    marker: 'campfire',
  },
  {
    name: 'беседка Нюлкин',
    coordinates: [158.713586, 55.856238],
    marker: 'campfire',
  },
  {
    name: 'домик Альпийский',
    coordinates: [158.803944, 55.821333],
    marker: 'house',
  },
  {
    name: 'домик Перевал',
    coordinates: [158.817944, 55.875333],
    marker: 'house',
  },
  {
    name: 'домик Сноубордистов',
    coordinates: [158.808556, 55.894944],
    marker: 'house',
  },
  {
    name: 'беседка Тупикин ключ',
    coordinates: [158.744078, 55.9085],
    marker: 'campfire',
  },
];

const trackGalyamakiSummerData = [
  {
    from: {
      coordinates: [158.726986, 55.915038],
    },
    to: {
      coordinates: [158.719086, 55.904238],
    },
  },
  {
    from: {
      coordinates: [158.719086, 55.904238],
    },
    to: {
      coordinates: [158.706086, 55.892238],
    },
  },
  {
    from: {
      coordinates: [158.706086, 55.892238],
    },
    to: {
      coordinates: [158.700086, 55.880238],
    },
  },
  {
    from: {
      coordinates: [158.700086, 55.880238],
    },
    to: {
      coordinates: [158.698186, 55.872238],
    },
  },
  {
    from: {
      coordinates: [158.698186, 55.872238],
    },
    to: {
      coordinates: [158.701186, 55.867238],
    },
  },
  {
    from: {
      coordinates: [158.701186, 55.867238],
    },
    to: {
      coordinates: [158.713586, 55.856238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.856238],
    },
    to: {
      coordinates: [158.713586, 55.852238],
    },
  },
  {
    from: {
      coordinates: [158.713586, 55.852238],
    },
    to: {
      coordinates: [158.736586, 55.842938],
    },
  },
  {
    from: {
      coordinates: [158.736586, 55.842938],
    },
    to: {
      coordinates: [158.756586, 55.812538],
    },
  },
  {
    from: {
      coordinates: [158.756586, 55.812538],
    },
    to: {
      coordinates: [158.769586, 55.793538],
    },
  },
  {
    from: {
      coordinates: [158.769586, 55.793538],
    },
    to: {
      coordinates: [158.758586, 55.790038],
    },
  },
  {
    from: {
      coordinates: [158.758586, 55.790038],
    },
    to: {
      coordinates: [158.773586, 55.785038],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.773586, 55.785038],
    },
    to: {
      coordinates: [158.773586, 55.768038],
    },
  },
  {
    from: {
      coordinates: [158.773586, 55.768038],
    },
    to: {
      coordinates: [158.720586, 55.751038],
    },
  },
  {
    from: {
      coordinates: [158.720586, 55.751038],
    },
    to: {
      coordinates: [158.717586, 55.734038],
    },
  },
  {
    from: {
      coordinates: [158.717586, 55.734038],
    },
    to: {
      coordinates: [158.777586, 55.692038],
    },
  },
  {
    from: {
      coordinates: [158.777586, 55.692038],
    },
    to: {
      coordinates: [158.766833, 55.678611],
    },
  },
];
const pointsGalyamakiSummerData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.706086, 55.892238],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.701616, 55.883238],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Летний стан',
    coordinates: [158.698186, 55.872238],
    marker: 'campfire',
  },
  {
    name: 'беседка Нюлкин',
    coordinates: [158.713586, 55.856238],
    marker: 'campfire',
  },
  {
    name: 'место для кемпинга',
    coordinates: [158.773586, 55.768038],
    marker: 'camping',
  },
  {
    name: 'домик Галямаки',
    coordinates: [],
    marker: 'house',
  },
];

const trackGalyamakiWinterData = [
  {
    from: {
      coordinates: [158.700986, 55.918538],
    },
    to: {
      coordinates: [158.693069, 55.905356],
    },
  },
  {
    from: {
      coordinates: [158.693069, 55.905356],
    },
    to: {
      coordinates: [158.686975, 55.884767],
    },
  },
  {
    from: {
      coordinates: [158.686975, 55.884767],
    },
    to: {
      coordinates: [158.669379, 55.871935],
    },
  },
  {
    from: {
      coordinates: [158.669379, 55.871935],
    },
    to: {
      coordinates: [158.644604, 55.855134],
    },
  },
  {
    from: {
      coordinates: [158.644604, 55.855134],
    },
    to: {
      coordinates: [158.643052, 55.845483],
    },
  },
];

const trackIchinskiyData = [
  {
    from: {
      coordinates: [158.700986, 55.918538],
    },
    to: {
      coordinates: [158.6894, 55.891333],
    },
  },
  {
    from: {
      coordinates: [158.6894, 55.891333],
    },
    to: {
      coordinates: [158.6653, 55.879283],
    },
  },
  {
    from: {
      coordinates: [158.6653, 55.879283],
    },
    to: {
      coordinates: [158.65925, 55.8638],
    },
  },
  {
    from: {
      coordinates: [158.65925, 55.8638],
    },
    to: {
      coordinates: [158.643052, 55.845483],
    },
  },
  {
    from: {
      coordinates: [158.643052, 55.845483],
    },
    to: {
      coordinates: [158.590866, 55.832999],
    },
  },
  //point
  {
    from: {
      coordinates: [158.590866, 55.832999],
    },
    to: {
      coordinates: [158.546986, 55.818169],
    },
  },
  {
    from: {
      coordinates: [158.546986, 55.818169],
    },
    to: {
      coordinates: [158.494863, 55.800172],
    },
  },
  ///point
  {
    from: {
      coordinates: [158.494863, 55.800172],
    },
    to: {
      coordinates: [158.337247, 55.72054],
    },
  },
  {
    from: {
      coordinates: [158.337247, 55.72054],
    },
    to: {
      coordinates: [158.307247, 55.66754],
    },
  },
  {
    from: {
      coordinates: [158.307247, 55.66754],
    },
    to: {
      coordinates: [158.273915, 55.675318],
    },
  },
  {
    from: {
      coordinates: [158.273915, 55.675318],
    },
    to: {
      coordinates: [158.228596, 55.678616],
    },
  },
  {
    from: {
      coordinates: [158.228596, 55.678616],
    },
    to: {
      coordinates: [158.189457, 55.680555],
    },
  },
  {
    from: {
      coordinates: [158.189457, 55.680555],
    },
    to: {
      coordinates: [158.128003, 55.695293],
    },
  },
  {
    from: {
      coordinates: [158.128003, 55.695293],
    },
    to: {
      coordinates: [158.092297, 55.686955],
    },
  },
  //point
  {
    from: {
      coordinates: [158.092297, 55.686955],
    },
    to: {
      coordinates: [158.04558, 55.660191],
    },
  },
  {
    from: {
      coordinates: [158.04558, 55.660191],
    },
    to: {
      coordinates: [158.015899, 55.660942],
    },
  },
  {
    from: {
      coordinates: [158.015899, 55.660942],
    },
    to: {
      coordinates: [157.989058, 55.658592],
    },
  },
  {
    from: {
      coordinates: [157.989058, 55.658592],
    },
    to: {
      coordinates: [157.955217, 55.64523],
    },
  },
  {
    from: {
      coordinates: [157.955217, 55.64523],
    },
    to: {
      coordinates: [157.92216, 55.669843],
    },
  },
  {
    from: {
      coordinates: [157.92216, 55.669843],
    },
    to: {
      coordinates: [157.883889, 55.678251],
    },
  },
  //point
  {
    from: {
      coordinates: [157.883889, 55.678251],
    },
    to: {
      coordinates: [157.822434, 55.689208],
    },
  },
  {
    from: {
      coordinates: [157.822434, 55.689208],
    },
    to: {
      coordinates: [157.799254, 55.689549],
    },
  },
  {
    from: {
      coordinates: [157.799254, 55.689549],
    },
    to: {
      coordinates: [157.775417, 55.693136],
    },
  },
  {
    from: {
      coordinates: [157.775417, 55.693136],
    },
    to: {
      coordinates: [157.744005, 55.682957],
    },
  },
  {
    from: {
      coordinates: [157.744005, 55.682957],
    },
    to: {
      coordinates: [157.718, 55.671556],
    },
  },
  {
    from: {
      coordinates: [157.718, 55.671556],
    },
    to: {
      coordinates: [157.744005, 55.682957],
    },
  },
  {
    from: {
      coordinates: [157.744005, 55.682957],
    },
    to: {
      coordinates: [157.775417, 55.693136],
    },
  },
  {
    from: {
      coordinates: [157.775417, 55.693136],
    },
    to: {
      coordinates: [157.799254, 55.689549],
    },
  },
  {
    from: {
      coordinates: [157.799254, 55.689549],
    },
    to: {
      coordinates: [157.822434, 55.689208],
    },
  },
  {
    from: {
      coordinates: [157.822434, 55.689208],
    },
    to: {
      coordinates: [157.883889, 55.678251],
    },
  },
  {
    from: {
      coordinates: [157.883889, 55.678251],
    },
    to: {
      coordinates: [157.92216, 55.669843],
    },
  },
  {
    from: {
      coordinates: [157.92216, 55.669843],
    },
    to: {
      coordinates: [157.955217, 55.64523],
    },
  },
  {
    from: {
      coordinates: [157.955217, 55.64523],
    },
    to: {
      coordinates: [157.91966, 55.628846],
    },
  },
  {
    from: {
      coordinates: [157.91966, 55.628846],
    },
    to: {
      coordinates: [157.912236, 55.627608],
    },
  },
  {
    from: {
      coordinates: [157.912236, 55.627608],
    },
    to: {
      coordinates: [157.888547, 55.60087],
    },
  },
  {
    from: {
      coordinates: [157.888547, 55.60087],
    },
    to: {
      coordinates: [157.817623, 55.549757],
    },
  },
  {
    from: {
      coordinates: [157.817623, 55.549757],
    },
    to: {
      coordinates: [157.794182, 55.514201],
    },
  },
  {
    from: {
      coordinates: [157.794182, 55.514201],
    },
    to: {
      coordinates: [157.752845, 55.479695],
    },
  },
];
const pointsIchinskiyData = [
  {
    name: 'беседка Улавкавчан',
    coordinates: [158.6894, 55.891333],
    marker: 'campfire',
  },
  {
    name: 'беседка Горгочан',
    coordinates: [158.6653, 55.879283],
    marker: 'campfire',
  },
  {
    name: 'смотровая на перевале Горгочан',
    coordinates: [158.65925, 55.8638],
    marker: 'campfire',
  },
  {
    name: 'кордон Димшиканский',
    coordinates: [158.643052, 55.845483],
    marker: 'house',
  },
  {
    name: 'беседка Брод',
    coordinates: [158.618917, 55.8397],
    marker: 'campfire',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.533167, 55.8134],
    marker: 'heavyWay',
  },
  {
    name: 'беседка Австрийская',
    coordinates: [158.433167, 55.768997],
    marker: 'campfire',
  },
  {
    name: 'беседка Кирдыманокль, домик Кадар',
    coordinates: [158.336417, 55.7191],
    marker: 'house',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [158.3227, 55.69488],
    marker: 'heavyWay',
  },
  {
    name: 'столик Окура',
    coordinates: [158.275783, 55.67488],
    marker: 'campfire',
  },
  {
    name: 'домик Очамнай',
    coordinates: [158.050633, 55.6631],
    marker: 'house',
  },
  {
    name: 'беседка Китайская фанза',
    coordinates: [158.042883, 55.66025],
    marker: 'campfire',
  },
  {
    name: 'кордон Дальний',
    coordinates: [157.9518, 55.647767],
    marker: 'house',
  },
  {
    name: 'проезд для внедорожника',
    coordinates: [157.888547, 55.60087],
    marker: 'heavyWay',
  },
  {
    name: 'кордон Кетачан',
    coordinates: [157.752845, 55.479695],
    marker: 'house',
  },
];

const Map: React.FC = () => {
  const ooptIndex = 2;

  const currentViewState = useSelector(selectCurrentViewState);
  // const dispatch = useAppDispatch();

  const { townSigns, townsTexts } = townsLayer();

  const { pointsSigns, pointsTexts } = pointsLayer();

  const { otherSigns, otherTexts } = otherLayer();

  const { trackLines, trackSigns, trackTexts } = tracksLayer();

  // console.log(tracksLines);
  // const trackPioneerHill = new LineLayer({
  //   id: 'Pioneer-Hill-layer',
  //   data: trackPioneerHillData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [220, 80, 0],
  // });
  // const pointsPioneerHillSigns = new IconLayer({
  //   id: 'Pioneer-Hill-signs-layer',
  //   data: pointsPioneerHillData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsPioneerHillTexts = new TextLayer({
  //   id: 'Pioneer-Hill-signs-text-layer',
  //   data: pointsPioneerHillData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackWhiteRocks = new LineLayer({
  //   id: 'White-Rocks-layer',
  //   data: trackWhiteRocksData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [0, 256, 0],
  //   getElevation: 30,
  // });
  // const pointsWhiteRocksSigns = new IconLayer({
  //   id: 'White-Rocks-signs-layer',
  //   data: pointsWhiteRocksData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsWhiteRocksTexts = new TextLayer({
  //   id: 'White-Rocks-signs-text-layer',
  //   data: pointsWhiteRocksData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackTupikinKey = new LineLayer({
  //   id: 'Tupikin-Key-layer',
  //   data: trackTupikinKeyData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [0, 0, 256],
  //   getElevation: 30,
  // });
  // const pointsTupikinKeySigns = new IconLayer({
  //   id: 'Tupikin-Key-signs-layer',
  //   data: pointsTupikinKeyData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsTupikinKeyTexts = new TextLayer({
  //   id: 'Tupikin-Key-signs-text-layer',
  //   data: pointsTupikinKeyData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackCheremshanka = new LineLayer({
  //   id: 'Cheremshanka-layer',
  //   data: trackCheremshankaData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [0, 128, 256],
  //   getElevation: 30,
  // });
  // const pointsCheremshankaSigns = new IconLayer({
  //   id: 'Cheremshanka-signs-layer',
  //   data: pointsCheremshankaData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsCheremshankaTexts = new TextLayer({
  //   id: 'Cheremshanka-signs-text-layer',
  //   data: pointsCheremshankaData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackIkar = new LineLayer({
  //   id: 'Ikar-layer',
  //   data: trackIkarData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [128, 0, 256],
  //   getElevation: 30,
  // });
  // const pointsIkarSigns = new IconLayer({
  //   id: 'Ikar-signs-layer',
  //   data: pointsIkarData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsIkarTexts = new TextLayer({
  //   id: 'Ikar-signs-text-layer',
  //   data: pointsIkarData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackDimchikhanskiy = new LineLayer({
  //   id: 'Dimchikhanskiy-layer',
  //   data: trackDimchikhanskiyData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [128, 0, 256],
  //   getElevation: 30,
  // });
  // const pointsDimchikhanskiySigns = new IconLayer({
  //   id: 'Dimchikhanskiy-signs-layer',
  //   data: pointsDimchikhanskiyData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsDimchikhanskiyTexts = new TextLayer({
  //   id: 'Dimchikhanskiy-signs-text-layer',
  //   data: pointsDimchikhanskiyData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackBlackCastle = new LineLayer({
  //   id: 'Black-Castle-layer',
  //   data: trackBlackCastleData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [128, 128, 256],
  //   getElevation: 30,
  // });
  // const pointsBlackCastleSigns = new IconLayer({
  //   id: 'Black-Castle-signs-layer',
  //   data: pointsBlackCastleData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsBlackCastleTexts = new TextLayer({
  //   id: 'Black-Castle-signs-text-layer',
  //   data: pointsBlackCastleData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackIlmaganLake = new LineLayer({
  //   id: 'Ilmagan-Lake-layer',
  //   data: trackIlmaganLakeData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [256, 128, 0],
  //   getElevation: 30,
  // });
  // const pointsIlmaganLakeSigns = new IconLayer({
  //   id: 'Ilmagan-Lake-signs-layer',
  //   data: pointsIlmaganLakeData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsIlmaganLakeTexts = new TextLayer({
  //   id: 'Ilmagan-Lake-signs-text-layer',
  //   data: pointsIlmaganLakeData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackSnowbordingCanyon = new LineLayer({
  //   id: 'Snowbording-Canyon-layer',
  //   data: trackSnowbordingCanyonData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [30, 150, 100],
  //   getElevation: 30,
  // });
  // const pointsSnowbordingCanyonSigns = new IconLayer({
  //   id: 'Snowbording-Canyon-signs-layer',
  //   data: pointsSnowbordingCanyonData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsSnowbordingCanyonTexts = new TextLayer({
  //   id: 'Snowbording-Canyon-signs-text-layer',
  //   data: pointsSnowbordingCanyonData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackVulcashiki = new LineLayer({
  //   id: 'Vulcashiki-layer',
  //   data: trackVulcashikiData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [256, 0, 0],
  //   getElevation: 30,
  // });
  // const pointsVulcashikiSigns = new IconLayer({
  //   id: 'Vulcashiki-signs-layer',
  //   data: pointsVulcashikiData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsVulcashikiTexts = new TextLayer({
  //   id: 'Vulcashiki-signs-text-layer',
  //   data: pointsVulcashikiData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackDigirenOlegende = new LineLayer({
  //   id: 'Digiren-Olegende-layer',
  //   data: trackDigirenOlegendeData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [128, 256, 128],
  //   getElevation: 30,
  // });
  // const pointsDigirenOlegendeSigns = new IconLayer({
  //   id: 'Digiren-Olegende-signs-layer',
  //   data: pointsDigirenOlegendeData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsDigirenOlegendeTexts = new TextLayer({
  //   id: 'Digiren-Olegende-signs-text-layer',
  //   data: pointsDigirenOlegendeData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackSinegorie = new LineLayer({
  //   id: 'Sinegorie-layer',
  //   data: trackSinegorieData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [256, 128, 128],
  //   getElevation: 30,
  // });
  // const pointsSinegorieSigns = new IconLayer({
  //   id: 'Sinegorie-signs-layer',
  //   data: pointsSinegorieData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsSinegorieTexts = new TextLayer({
  //   id: 'Sinegorie-signs-text-layer',
  //   data: pointsSinegorieData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackGalyamakiSummer = new LineLayer({
  //   id: 'Galyamaki-Summer-layer',
  //   data: trackGalyamakiSummerData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [128, 256, 256],
  //   getElevation: 30,
  // });
  // const pointsGalyamakiSummerSigns = new IconLayer({
  //   id: 'Galyamaki-Summer-signs-layer',
  //   data: pointsGalyamakiSummerData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsGalyamakiSummerTexts = new TextLayer({
  //   id: 'Galyamaki-Summer-signs-text-layer',
  //   data: pointsGalyamakiSummerData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });
  //
  // const trackGalyamakiWinter = new LineLayer({
  //   id: 'Galyamaki-Winter-layer',
  //   data: trackGalyamakiWinterData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [250, 180, 250],
  //   getElevation: 30,
  // });
  //
  // const trackIchinskiy = new LineLayer({
  //   id: 'Ichinskiy-layer',
  //   data: trackIchinskiyData,
  //   pickable: true,
  //   getWidth: 5,
  //   getSourcePosition: (d) => d.from.coordinates,
  //   getTargetPosition: (d) => d.to.coordinates,
  //   getColor: (d) => [0, 150, 150],
  //   getElevation: 30,
  // });
  // const pointsIchinskiySigns = new IconLayer({
  //   id: 'Ichinskiy-signs-layer',
  //   data: pointsIchinskiyData,
  //   pickable: true,
  //   iconAtlas: iconAtlas,
  //   iconMapping: ICON_MAPPING,
  //   getIcon: (d) => d.marker,
  //   getPosition: (d) => d.coordinates,
  //   getSize: (d) => 65,
  // });
  // const pointsIchinskiyTexts = new TextLayer({
  //   id: 'Ichinskiy-signs-text-layer',
  //   data: pointsIchinskiyData,
  //   pickable: true,
  //   fontFamily: 'Columba Ruby Pro',
  //   characterSet: 'auto',
  //   fontWeight: 500,
  //   getPosition: (d) => d.coordinates,
  //   getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
  //   getSize: 30,
  //   getAngle: 0,
  //   getTextAnchor: 'start',
  //   getAlignmentBaseline: 'bottom',
  //   getPixelOffset: [30, 10],
  // });

  const layers = [
    // new TileLayer({
    //     //   id: 'tile-layer',
    //     //   data: 'http://localhost:8080/styles/basic-preview/{z}/{x}/{y}.png',
    //     //   minZoom: 0,
    //     //   maxZoom: 19,
    //     //   tileSize: 128,
    //     //   onClick: onClick,
    //     //   renderSubLayers: (props: any) => {
    //     //     const {
    //     //       bbox: { west, south, east, north },
    //     //     } = props.tile;
    //     //
    //     //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     //     // @ts-ignore
    //     //     return new BitmapLayer(props, {
    //     //       data: null,
    //     //       image: props.data,
    //     //       bounds: [west, south, east, north],
    //     //     });
    //     //   },
    //     // }),
    ...bitmapLayers,
    borders,
    pointsSigns,
    pointsTexts,
    townSigns,
    townsTexts,

    // trackPioneerHill,
    // pointsPioneerHillSigns,
    // // pointsPioneerHillTexts,
    // trackVulcashiki,
    // pointsVulcashikiSigns,
    // // pointsVulcashikiTexts,
    // trackWhiteRocks,
    // pointsWhiteRocksSigns,
    // // pointsWhiteRocksTexts,
    // trackTupikinKey,
    // pointsTupikinKeySigns,
    // // pointsTupikinKeyTexts,
    // trackCheremshanka,
    // pointsCheremshankaSigns,
    // // pointsCheremshankaTexts,
    // trackIkar,
    // pointsIkarSigns,
    // // pointsIkarTexts,
    // trackDimchikhanskiy,
    // pointsDimchikhanskiySigns,
    // // pointsDimchikhanskiyTexts,
    // trackBlackCastle,
    // pointsBlackCastleSigns,
    // // pointsBlackCastleTexts,
    // trackIlmaganLake,
    // pointsIlmaganLakeSigns,
    // // pointsIlmaganLakeTexts,
    // trackSinegorie,
    // pointsSinegorieSigns,
    // // pointsSinegorieTexts,
    // trackSnowbordingCanyon,
    // pointsSnowbordingCanyonSigns,
    // // pointsSnowbordingCanyonTexts,
    // trackDigirenOlegende,
    // pointsDigirenOlegendeSigns,
    // // pointsDigirenOlegendeTexts,
    // trackGalyamakiSummer,
    // pointsGalyamakiSummerSigns,
    // // pointsGalyamakiSummerTexts,
    // // trackGalyamakiWinter,
    // trackIchinskiy,
    // pointsIchinskiySigns,
    // // pointsIchinskiyTexts,
    // mapSigns,
    // signsTexts,
    otherSigns,
    otherTexts,
    trackLines,
    // trackSigns,
    // trackTexts,
  ];

  // console.log(layers);

  const viewStateChangeControl = (view: any) => {
    view.viewState.longitude = Math.min(
      LONGITUDE_RANGE[1],
      Math.max(LONGITUDE_RANGE[0], view.viewState.longitude)
    );
    view.viewState.latitude = Math.min(
      LATITUDE_RANGE[1],
      Math.max(LATITUDE_RANGE[0], view.viewState.latitude)
    );
    return view.viewState;
  };

  return (
    <div className={'Deck'}>
      <DeckGL
        controller={true}
        initialViewState={currentViewState.current}
        layers={layers}
        style={{ background: '#191919' }}
        onViewStateChange={viewStateChangeControl}
      />
    </div>
  );
};
export default Map;
