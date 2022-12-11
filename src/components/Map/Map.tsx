import React from 'react';
import DeckGL from '@deck.gl/react/typed';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TileLayer } from 'deck.gl';
import {
  BitmapLayer,
  PolygonLayer,
  IconLayer,
  TextLayer,
  LineLayer,
  GeoJsonLayer,
} from '@deck.gl/layers/typed';
import image1 from './map_16_pieces/map_1x1.png';
import image2 from './map_16_pieces/map_1x2.png';
import image3 from './map_16_pieces/map_1x3.png';
import image4 from './map_16_pieces/map_1x4.png';
import image5 from './map_16_pieces/map_2x1.png';
import image6 from './map_16_pieces/map_2x2.png';
import image7 from './map_16_pieces/map_2x3.png';
import image8 from './map_16_pieces/map_2x4.png';
import image9 from './map_16_pieces/map_3x1.png';
import image10 from './map_16_pieces/map_3x2.png';
import image11 from './map_16_pieces/map_3x3.png';
import image12 from './map_16_pieces/map_3x4.png';
import image13 from './map_16_pieces/map_4x1.png';
import image14 from './map_16_pieces/map_4x2.png';
import image15 from './map_16_pieces/map_4x3.png';
import image16 from './map_16_pieces/map_4x4.png';
import iconAtlas from './iconsmap.png';

const INITIAL_VIEW_STATE = {
  longitude: 158.5,
  latitude: 56,
  zoom: 9,
  maxZoom: 16,
};

const ICON_MAPPING = {
  office: { x: 0, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  spring: { x: 85, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  thermalSpring: {
    x: 170,
    y: 0,
    width: 65,
    height: 90,
    mask: false,
    anchorY: 90,
  },
  campfire: { x: 255, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  camping: { x: 340, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  house: { x: 430, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  heavyWay: { x: 515, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
  sleepingVolcano: {
    x: 603,
    y: 0,
    width: 65,
    height: 90,
    mask: false,
    anchorY: 90,
  },
  activeVolcano: {
    x: 688,
    y: 0,
    width: 65,
    height: 90,
    mask: false,
    anchorY: 90,
  },
  naturePoint: {
    x: 775,
    y: 0,
    width: 65,
    height: 90,
    mask: false,
    anchorY: 90,
  },
  building: { x: 858, y: 0, width: 65, height: 90, mask: false, anchorY: 90 },
};

const tilesBase = [
  {
    image: image1,
    bottomLeft: { x: 155.529698, y: 56.489897 },
    topRight: { x: 156.904451, y: 56.921245 },
  },
  {
    image: image2,
    bottomLeft: { x: 156.904451, y: 56.489897 },
    topRight: { x: 158.279204, y: 56.921245 },
  },
  {
    image: image3,
    bottomLeft: { x: 158.279204, y: 56.489897 },
    topRight: { x: 159.653957, y: 56.921245 },
  },
  {
    image: image4,
    bottomLeft: { x: 159.653957, y: 56.489897 },
    topRight: { x: 161.02871, y: 56.921245 },
  },
  {
    image: image5,
    bottomLeft: { x: 155.529698, y: 56.05855 },
    topRight: { x: 156.904451, y: 56.489897 },
  },
  {
    image: image6,
    bottomLeft: { x: 156.904451, y: 56.05855 },
    topRight: { x: 158.279204, y: 56.489897 },
  },
  {
    image: image7,
    bottomLeft: { x: 158.279204, y: 56.05855 },
    topRight: { x: 159.653957, y: 56.489897 },
  },
  {
    image: image8,
    bottomLeft: { x: 159.653957, y: 56.05855 },
    topRight: { x: 161.02871, y: 56.489897 },
  },
  {
    image: image9,
    bottomLeft: { x: 155.529698, y: 55.627202 },
    topRight: { x: 156.904451, y: 56.05855 },
  },
  {
    image: image10,
    bottomLeft: { x: 156.904451, y: 55.627202 },
    topRight: { x: 158.279204, y: 56.05855 },
  },
  {
    image: image11,
    bottomLeft: { x: 158.279204, y: 55.627202 },
    topRight: { x: 159.653957, y: 56.05855 },
  },
  {
    image: image12,
    bottomLeft: { x: 159.653957, y: 55.627202 },
    topRight: { x: 161.02871, y: 56.05855 },
  },
  {
    image: image13,
    bottomLeft: { x: 155.529698, y: 55.195854 },
    topRight: { x: 156.904451, y: 55.627202 },
  },
  {
    image: image14,
    bottomLeft: { x: 156.904451, y: 55.195854 },
    topRight: { x: 158.279204, y: 55.627202 },
  },
  {
    image: image15,
    bottomLeft: { x: 158.279204, y: 55.195854 },
    topRight: { x: 159.653957, y: 55.627202 },
  },
  {
    image: image16,
    bottomLeft: { x: 159.653957, y: 55.195854 },
    topRight: { x: 161.02871, y: 55.627202 },
  },
];

const bitmapLayers = tilesBase.map(
  ({ image, bottomLeft, topRight }, index) =>
    new BitmapLayer({
      id: `bitmap-layer-${index}`,
      bounds: [bottomLeft.x, bottomLeft.y, topRight.x, topRight.y],
      image,
      opacity: 0.8,
    })
);

const borderData = [
  {
    contour: [
      [157.797176, 56.822593],
      [157.931587, 56.764942],
      [158.008492, 56.754571],
      [158.07212, 56.767189],
      [158.119499, 56.756818],
      [158.215286, 56.766529],
      [158.248932, 56.764267],
      [158.307468, 56.775861],
      [158.325321, 56.773127],
      [158.322746, 56.772468],
      [158.400165, 56.793952],
      [158.448917, 56.79301],
      [158.469173, 56.800074],
      [158.524281, 56.572695],
      [159.639589, 56.689976],
      [159.626542, 56.650422],
      [159.646319, 56.614268],
      [159.542292, 56.522912],
      [159.507273, 56.501082],
      [159.48118, 56.48228],
      [159.478434, 56.435328],
      [159.453371, 56.422772],
      [159.453371, 56.422772],
      [159.311922, 56.423533],
      [159.298876, 56.408119],
      [159.371317, 56.348685],
      [159.38917, 56.27197],
      [159.309862, 56.20907],
      [159.182919, 56.196344],
      [159.137944, 56.161301],
      [159.195279, 56.103783],
      [159.226178, 56.087279],
      [159.166097, 56.043489],
      [159.16019, 56.016882],
      [159.179073, 55.993606],
      [159.158817, 55.975514],
      [158.90233, 55.547853],
      [158.889971, 55.54941],
      [158.888941, 55.551357],
      [158.427574, 55.585716],
      [158.368179, 55.460091],
      [158.308441, 55.483884],
      [158.255226, 55.480374],
      [158.203728, 55.534151],
      [158.072922, 55.516039],
      [157.992584, 55.52792],
      [157.926666, 55.523441],
      [157.828133, 55.509221],
      [157.738182, 55.452678],
      [157.70282, 55.344826],
      [157.624199, 55.298234],
      [157.452643, 55.296991],
      [157.120977, 55.359107],
      [157.085271, 55.444678],
      [156.914251, 55.574427],
      [156.866307, 55.766096],
      [157.546438, 55.69984],
      [157.665336, 55.756638],
      [158.301026, 56.152448],
      [158.311986, 56.166905],
      [158.30512, 56.188066],
      [158.277167, 56.194448],
      [158.190478, 56.205453],
      [158.119925, 56.189184],
      [158.084563, 56.191385],
      [158.009084, 56.209748],
      [157.904027, 56.220079],
      [157.882741, 56.219219],
      [157.788024, 56.251391],
      [157.737992, 56.279594],
      [157.606843, 56.449271],
      [157.474474, 56.535894],
      [157.514471, 56.615485],
      [157.515844, 56.633937],
      [157.525972, 56.640748],
      [157.529749, 56.672043],
      [157.556184, 56.687445],
      [157.797176, 56.822593],
    ],
    zipcode: 94107,
    population: 26599,
    area: 6.11,
  },
];

const volcanoData = [
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
    name: 'влк.Анаун',
    height: '1902 м',
    coordinates: [158.84452, 56.299655],
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
    name: 'г.Дыгерен-Оленгенде',
    height: '1950 м',
    coordinates: [158.819584, 55.8443],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Южный Черпук',
    height: '1771 м',
    coordinates: [157.466697, 55.549442],
    marker: 'sleepingVolcano',
  },
  {
    name: 'влк.Ичинский',
    height: '3604 м',
    coordinates: [157.718, 55.671556],
    marker: 'activeVolcano',
  },
];

const springsData = [
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

const townsData = [
  {
    name: 'с.Эссо',
    coordinates: [158.700986, 55.918538],
    marker: 'office',
  },
  {
    name: 'с.Анавгай',
    coordinates: [158.968909, 56.049678],
    marker: 'building',
  },
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
];

const trackPioneerHillData = [
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
      coordinates: [158.685327, 55.929],
    },
  },
];
const pointsPioneerHillData = [
  {
    name: 'Беседка на вершине г.Пионерская',
    coordinates: [158.685327, 55.929],
    marker: 'campfire',
  },
];

const trackWhiteRocksData = [
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
      coordinates: [158.68075, 55.921293],
    },
  },
  {
    from: {
      coordinates: [158.68075, 55.921293],
    },
    to: {
      coordinates: [158.65075, 55.928293],
    },
  },
  {
    from: {
      coordinates: [158.65075, 55.928293],
    },
    to: {
      coordinates: [158.61175, 55.938293],
    },
  },
  {
    from: {
      coordinates: [158.61175, 55.938293],
    },
    to: {
      coordinates: [158.60675, 55.938293],
    },
  },
  {
    from: {
      coordinates: [158.60675, 55.938293],
    },
    to: {
      coordinates: [158.60375, 55.947293],
    },
  },
];
const pointsWhiteRocksData = [
  {
    name: 'проезд для внедорожника',
    coordinates: [158.61175, 55.938293],
    marker: 'heavyWay',
  },
  {
    name: 'Беседка',
    coordinates: [158.60375, 55.947293],
    marker: 'campfire',
  },
];

const trackTupikinKeyData = [
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
      coordinates: [158.734086, 55.901838],
    },
  },
  {
    from: {
      coordinates: [158.734086, 55.901838],
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
      coordinates: [158.736086, 55.909838],
    },
    to: {
      coordinates: [158.726986, 55.915038],
    },
  },
];
const pointsTupikinKeyData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Тупикин ключ',
    coordinates: [158.744078, 55.9085],
    marker: 'campfire',
  },
];

const trackCheremshankaData = [
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
];
const pointsCheremshankaData = [
  {
    name: 'беседка Начальная',
    coordinates: [158.726986, 55.915038],
    marker: 'campfire',
  },
  {
    name: 'беседка Черемшанка',
    coordinates: [158.753056, 55.895533],
    marker: 'campfire',
  },
];

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
    coordinates: [158.874222, 56.194072],
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
    coordinates: [158.766833, 55.678611],
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
  const onClick = (info: any) => {
    alert(info);
  };

  const borders = new PolygonLayer({
    id: 'borders-layer',
    data: borderData,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    getPolygon: (d) => d.contour,
    getElevation: (d) => d.population / d.area / 10,
    getFillColor: (d) => [d.population / d.area / 60, 140, 0],
    getLineColor: [80, 80, 80],
    getLineWidth: 3,
    opacity: 0.05,
  });

  const mapSigns = new IconLayer({
    id: 'signs-layer',
    data: [...volcanoData, ...springsData, ...townsData],
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });

  const signsTexts = new TextLayer({
    id: 'signs-text-layer',
    data: [...volcanoData, ...springsData, ...townsData],
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackPioneerHill = new LineLayer({
    id: 'Pioneer-Hill-layer',
    data: trackPioneerHillData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [220, 80, 0],
  });
  const pointsPioneerHillSigns = new IconLayer({
    id: 'Pioneer-Hill-signs-layer',
    data: pointsPioneerHillData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsPioneerHillTexts = new TextLayer({
    id: 'Pioneer-Hill-signs-text-layer',
    data: pointsPioneerHillData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackWhiteRocks = new LineLayer({
    id: 'White-Rocks-layer',
    data: trackWhiteRocksData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [0, 256, 0],
    getElevation: 30,
  });
  const pointsWhiteRocksSigns = new IconLayer({
    id: 'White-Rocks-signs-layer',
    data: pointsWhiteRocksData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsWhiteRocksTexts = new TextLayer({
    id: 'White-Rocks-signs-text-layer',
    data: pointsWhiteRocksData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackTupikinKey = new LineLayer({
    id: 'Tupikin-Key-layer',
    data: trackTupikinKeyData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [0, 0, 256],
    getElevation: 30,
  });
  const pointsTupikinKeySigns = new IconLayer({
    id: 'Tupikin-Key-signs-layer',
    data: pointsTupikinKeyData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsTupikinKeyTexts = new TextLayer({
    id: 'Tupikin-Key-signs-text-layer',
    data: pointsTupikinKeyData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackCheremshanka = new LineLayer({
    id: 'Cheremshanka-layer',
    data: trackCheremshankaData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [0, 128, 256],
    getElevation: 30,
  });
  const pointsCheremshankaSigns = new IconLayer({
    id: 'Cheremshanka-signs-layer',
    data: pointsCheremshankaData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsCheremshankaTexts = new TextLayer({
    id: 'Cheremshanka-signs-text-layer',
    data: pointsCheremshankaData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackIkar = new LineLayer({
    id: 'Ikar-layer',
    data: trackIkarData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [128, 0, 256],
    getElevation: 30,
  });
  const pointsIkarSigns = new IconLayer({
    id: 'Ikar-signs-layer',
    data: pointsIkarData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsIkarTexts = new TextLayer({
    id: 'Ikar-signs-text-layer',
    data: pointsIkarData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackDimchikhanskiy = new LineLayer({
    id: 'Dimchikhanskiy-layer',
    data: trackDimchikhanskiyData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [128, 0, 256],
    getElevation: 30,
  });
  const pointsDimchikhanskiySigns = new IconLayer({
    id: 'Dimchikhanskiy-signs-layer',
    data: pointsDimchikhanskiyData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsDimchikhanskiyTexts = new TextLayer({
    id: 'Dimchikhanskiy-signs-text-layer',
    data: pointsDimchikhanskiyData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackBlackCastle = new LineLayer({
    id: 'Black-Castle-layer',
    data: trackBlackCastleData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [128, 128, 256],
    getElevation: 30,
  });
  const pointsBlackCastleSigns = new IconLayer({
    id: 'Black-Castle-signs-layer',
    data: pointsBlackCastleData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsBlackCastleTexts = new TextLayer({
    id: 'Black-Castle-signs-text-layer',
    data: pointsBlackCastleData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackIlmaganLake = new LineLayer({
    id: 'Ilmagan-Lake-layer',
    data: trackIlmaganLakeData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [256, 128, 0],
    getElevation: 30,
  });
  const pointsIlmaganLakeSigns = new IconLayer({
    id: 'Ilmagan-Lake-signs-layer',
    data: pointsIlmaganLakeData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsIlmaganLakeTexts = new TextLayer({
    id: 'Ilmagan-Lake-signs-text-layer',
    data: pointsIlmaganLakeData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackSnowbordingCanyon = new LineLayer({
    id: 'Snowbording-Canyon-layer',
    data: trackSnowbordingCanyonData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [30, 150, 100],
    getElevation: 30,
  });
  const pointsSnowbordingCanyonSigns = new IconLayer({
    id: 'Snowbording-Canyon-signs-layer',
    data: pointsSnowbordingCanyonData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsSnowbordingCanyonTexts = new TextLayer({
    id: 'Snowbording-Canyon-signs-text-layer',
    data: pointsSnowbordingCanyonData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackVulcashiki = new LineLayer({
    id: 'Vulcashiki-layer',
    data: trackVulcashikiData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [256, 0, 0],
    getElevation: 30,
  });
  const pointsVulcashikiSigns = new IconLayer({
    id: 'Vulcashiki-signs-layer',
    data: pointsVulcashikiData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsVulcashikiTexts = new TextLayer({
    id: 'Vulcashiki-signs-text-layer',
    data: pointsVulcashikiData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackDigirenOlegende = new LineLayer({
    id: 'Digiren-Olegende-layer',
    data: trackDigirenOlegendeData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [128, 256, 128],
    getElevation: 30,
  });
  const pointsDigirenOlegendeSigns = new IconLayer({
    id: 'Digiren-Olegende-signs-layer',
    data: pointsDigirenOlegendeData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsDigirenOlegendeTexts = new TextLayer({
    id: 'Digiren-Olegende-signs-text-layer',
    data: pointsDigirenOlegendeData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackSinegorie = new LineLayer({
    id: 'Sinegorie-layer',
    data: trackSinegorieData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [256, 128, 128],
    getElevation: 30,
  });
  const pointsSinegorieSigns = new IconLayer({
    id: 'Sinegorie-signs-layer',
    data: pointsSinegorieData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsSinegorieTexts = new TextLayer({
    id: 'Sinegorie-signs-text-layer',
    data: pointsSinegorieData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackGalyamakiSummer = new LineLayer({
    id: 'Galyamaki-Summer-layer',
    data: trackGalyamakiSummerData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [128, 256, 256],
    getElevation: 30,
  });
  const pointsGalyamakiSummerSigns = new IconLayer({
    id: 'Galyamaki-Summer-signs-layer',
    data: pointsGalyamakiSummerData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsGalyamakiSummerTexts = new TextLayer({
    id: 'Galyamaki-Summer-signs-text-layer',
    data: pointsGalyamakiSummerData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

  const trackGalyamakiWinter = new LineLayer({
    id: 'Galyamaki-Winter-layer',
    data: trackGalyamakiWinterData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [250, 180, 250],
    getElevation: 30,
  });

  const trackIchinskiy = new LineLayer({
    id: 'Ichinskiy-layer',
    data: trackIchinskiyData,
    pickable: true,
    getWidth: 10,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [0, 150, 150],
    getElevation: 30,
  });
  const pointsIchinskiySigns = new IconLayer({
    id: 'Ichinskiy-signs-layer',
    data: pointsIchinskiyData,
    pickable: true,
    iconAtlas: iconAtlas,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => d.marker,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 65,
  });
  const pointsIchinskiyTexts = new TextLayer({
    id: 'Ichinskiy-signs-text-layer',
    data: pointsIchinskiyData,
    pickable: true,
    fontFamily: 'Columba Ruby Pro',
    characterSet: 'auto',
    fontWeight: 500,
    getPosition: (d) => d.coordinates,
    getText: (d) => (d.height ? `${d.name}, ${d.height}` : `${d.name}`),
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'start',
    getAlignmentBaseline: 'bottom',
    getPixelOffset: [30, 10],
  });

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
    mapSigns,
    signsTexts,
    trackPioneerHill,
    pointsPioneerHillSigns,
    pointsPioneerHillTexts,
    trackVulcashiki,
    pointsVulcashikiSigns,
    pointsVulcashikiTexts,
    trackWhiteRocks,
    pointsWhiteRocksSigns,
    pointsWhiteRocksTexts,
    trackTupikinKey,
    pointsTupikinKeySigns,
    pointsTupikinKeyTexts,
    trackCheremshanka,
    pointsCheremshankaSigns,
    pointsCheremshankaTexts,
    trackIkar,
    pointsIkarSigns,
    pointsIkarTexts,
    trackDimchikhanskiy,
    pointsDimchikhanskiySigns,
    pointsDimchikhanskiyTexts,
    trackBlackCastle,
    pointsBlackCastleSigns,
    pointsBlackCastleTexts,
    trackIlmaganLake,
    pointsIlmaganLakeSigns,
    pointsIlmaganLakeTexts,
    trackSinegorie,
    pointsSinegorieSigns,
    pointsSinegorieTexts,
    trackSnowbordingCanyon,
    pointsSnowbordingCanyonSigns,
    pointsSnowbordingCanyonTexts,
    trackDigirenOlegende,
    pointsDigirenOlegendeSigns,
    pointsDigirenOlegendeTexts,
    trackGalyamakiSummer,
    pointsGalyamakiSummerSigns,
    pointsGalyamakiSummerTexts,
    // trackGalyamakiWinter,
    trackIchinskiy,
    pointsIchinskiySigns,
    pointsIchinskiyTexts,
  ];

  return (
    <div className={'Deck'}>
      <DeckGL
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
        // getTooltip={({ object }) =>
        //   object && `${object.zipcode}\nPopulation: ${object.population}`
        // }
        style={{ background: '#222222' }}
      />
    </div>
  );
};
export default Map;
