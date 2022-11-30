import React from 'react';
import DeckGL from '@deck.gl/react/typed';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TileLayer } from 'deck.gl';
import { BitmapLayer } from '@deck.gl/layers/typed';

const INITIAL_VIEW_STATE = {
  longitude: 159,
  latitude: 55.98,
  zoom: 7,
  maxZoom: 16,
};

const Map: React.FC = () => {
  const onClick = (info: any) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(
        `${info.object.properties.name} (${info.object.properties.abbrev})`
      );
    }
  };

  const layers = [
    new TileLayer({
      id: 'tile-layer',
      data: 'http://localhost:8080/styles/basic-preview/{z}/{x}/{y}.png',
      minZoom: 0,
      maxZoom: 19,
      tileSize: 128,
      onClick: onClick,
      renderSubLayers: (props: any) => {
        const {
          bbox: { west, south, east, north },
        } = props.tile;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        });
      },
    }),
  ];

  return (
    <div className={'Deck'}>
      <DeckGL
        controller={true}
        initialViewState={INITIAL_VIEW_STATE}
        layers={layers}
      />
    </div>
  );
};
export default Map;