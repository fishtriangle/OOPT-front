import React from 'react';
import styles from './TrackTitle.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentTrackId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { EnumDescriptionBlock } from '../../common/types';
import { useAppDispatch } from '../../redux/store';
import { TrackIcons } from '../TrackIcons/TrackIcons';

interface ITrackTitleProps {
  trackId: number;
  trackTitle: string;
  trackTransport: string;
}

export const TrackTitle: React.FC<ITrackTitleProps> = ({
  trackId,
  trackTitle,
  trackTransport,
}) => {
  const dispatch = useAppDispatch();

  const handleTrackClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentTrackId(id));
      dispatch(setBlockType(EnumDescriptionBlock.TRACK));
      dispatch(showBlock());
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <TrackIcons trackTransport={trackTransport} />
      <div className={styles.emptyDiv} />
      <p className={styles.list} onClick={() => handleTrackClick(trackId)}>
        {trackTitle}
      </p>
    </div>
  );
};
