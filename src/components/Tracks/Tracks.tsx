import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  ITrack,
} from '../../common/types';
import { GET_OOPT_TRACKS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import styles from './Tracks.module.scss';
import Text from '../Text/Text';
import {
  hideBlock,
  setBlockType,
  setCurrentTrackId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Tracks: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_TRACKS,
    {
      variables: {
        pollInterval: 3000,
        ooptUniqueInput: { id: ooptIndex },
      },
    }
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки информации об ООПТ...</p>
        <p>{error.message}</p>
      </>
    );

  const handleTrackClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentTrackId(id));
      dispatch(setBlockType(EnumDescriptionBlock.TRACK));
      dispatch(showBlock());
    }, 1000);
  };

  const tracks: ITrack[] | undefined = data?.getOOPT.tracks;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Маршруты</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          tracks && tracks?.length > 10 && 'add-scrollbar'
        }`}
      >
        <p className={styles.listSubHead}>Однодневные маршруты:</p>
        {tracks
          ? tracks
              .filter(
                ({ timeInTrack }) =>
                  timeInTrack && timeInTrack.includes('Однодневный')
              )
              .map(({ id, title }) => (
                <p
                  key={id}
                  className={styles.list}
                  onClick={() => handleTrackClick(id)}
                >
                  {title}
                </p>
              ))
          : undefined}
        <br />
        <p className={styles.listSubHead}>Многодневные маршруты:</p>
        {tracks
          ? tracks
              .filter(
                ({ timeInTrack }) =>
                  !(timeInTrack && timeInTrack.includes('Однодневный'))
              )
              .map(({ id, title }) => (
                <p
                  key={id}
                  className={styles.list}
                  onClick={() => handleTrackClick(id)}
                >
                  {title}
                </p>
              ))
          : undefined}
      </div>
    </div>
  );
};

export default Tracks;
