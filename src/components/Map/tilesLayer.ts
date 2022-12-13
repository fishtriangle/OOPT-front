import { BitmapLayer } from '@deck.gl/layers/typed';
import image1 from './map_16_pieces/map_1x1.jpg';
import image2 from './map_16_pieces/map_1x2.jpg';
import image3 from './map_16_pieces/map_1x3.jpg';
import image4 from './map_16_pieces/map_1x4.jpg';
import image5 from './map_16_pieces/map_2x1.jpg';
import image6 from './map_16_pieces/map_2x2.jpg';
import image7 from './map_16_pieces/map_2x3.jpg';
import image8 from './map_16_pieces/map_2x4.jpg';
import image9 from './map_16_pieces/map_3x1.jpg';
import image10 from './map_16_pieces/map_3x2.jpg';
import image11 from './map_16_pieces/map_3x3.jpg';
import image12 from './map_16_pieces/map_3x4.jpg';
import image13 from './map_16_pieces/map_4x1.jpg';
import image14 from './map_16_pieces/map_4x2.jpg';
import image15 from './map_16_pieces/map_4x3.jpg';
import image16 from './map_16_pieces/map_4x4.jpg';

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

export default bitmapLayers;
