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

const Map: React.FC = () => {
  const currentViewState = useSelector(selectCurrentViewState);

  const { townSigns, townsTexts } = townsLayer();

  const { pointsSigns, pointsTexts } = pointsLayer();

  const { otherSigns, otherTexts } = otherLayer();

  const { trackLines, trackSigns, trackTexts } = tracksLayer();

  const layers = [
    ...bitmapLayers,
    borders,
    trackLines,
    pointsSigns,
    pointsTexts,
    otherSigns,
    trackSigns,
    trackTexts,
    townSigns,
    townsTexts,
  ];

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
