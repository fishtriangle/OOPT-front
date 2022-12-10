import React from 'react';
import DeckGL from '@deck.gl/react/typed';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TileLayer } from 'deck.gl';
import { BitmapLayer, PolygonLayer } from '@deck.gl/layers/typed';
import image from './map_8k.png';
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

const INITIAL_VIEW_STATE = {
  longitude: 158.5,
  latitude: 56,
  zoom: 9,
  maxZoom: 16,
};

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

const Map: React.FC = () => {
  const onClick = (info: any) => {
    alert(info);
  };

  const borders = new PolygonLayer({
    id: 'polygon-layer',
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
    opacity: 0.1,
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
  ];

  return (
    <div className={'Deck'}>
      <DeckGL
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
        getTooltip={({ object }) =>
          object && `${object.zipcode}\nPopulation: ${object.population}`
        }
      />
    </div>
  );
};
export default Map;
