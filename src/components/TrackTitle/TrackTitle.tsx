import React from 'react';
import styles from './TrackTitle.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentTrackId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { EnumDescriptionBlock, ITrack } from '../../common/types';
import { useAppDispatch } from '../../redux/store';
import { TrackIcons } from '../TrackIcons/TrackIcons';
import { createTrackViewData } from '../Map/utilities';
import { setCurrentViewState } from '../../redux/slices/currentViewStateSlice';

interface ITrackTitleProps {
  track: ITrack;
}

export const TrackTitle: React.FC<ITrackTitleProps> = ({ track }) => {
  const dispatch = useAppDispatch();

  const handleTrackClick = (track: ITrack) => {
    // const iconData = createLayerData(item);
    const viewData = createTrackViewData(track);

    // iconData && dispatch(setCurrentLabel(iconData));
    dispatch(setCurrentViewState(viewData));

    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentTrackId(track.id));
      dispatch(setBlockType(EnumDescriptionBlock.TRACK));
      dispatch(showBlock());
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <TrackIcons trackTransport={track.transport || ''} />
      <div className={styles.emptyDiv} />
      <p className={styles.list} onClick={() => handleTrackClick(track)}>
        {track.title}
      </p>
    </div>
  );
};
