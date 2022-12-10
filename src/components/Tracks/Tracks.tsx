import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars, ITrack } from '../../common/types';
import { GET_OOPT_TRACKS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import styles from './Tracks.module.scss';
import { TrackTitle } from '../TrackTitle/TrackTitle';

const Tracks: React.FC = () => {
  const ooptIndex = 2;

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

  const tracks: ITrack[] | undefined = data?.getOOPT.tracks.filter(
    ({ disabled }) => !disabled
  );

  return (
    <div className={'text-black'}>
      <p className={styles.h1}>
        Маршруты
        <br />
        {data?.getOOPT.title}
      </p>

      <div className={`${styles.listBlock}`}>
        <div className={`row add-scrollbar`}>
          <div className={'col-6'}>
            <p className={styles.listSubHead}>Однодневные маршруты:</p>
            {tracks
              ? tracks
                  .filter(
                    ({ timeInTrack }) =>
                      timeInTrack && timeInTrack.includes('Однодневный')
                  )
                  .map(({ id, title, transport }) => (
                    <TrackTitle
                      trackId={id}
                      trackTitle={title || ''}
                      trackTransport={transport || ''}
                      key={id}
                    />
                  ))
              : undefined}
          </div>
          <div className={'col-6'}>
            <p className={styles.listSubHead}>Многодневные маршруты:</p>
            {tracks
              ? tracks
                  .filter(
                    ({ timeInTrack }) =>
                      !(timeInTrack && timeInTrack.includes('Однодневный'))
                  )
                  .map(({ id, title, transport }) => (
                    <TrackTitle
                      trackId={id}
                      trackTitle={title || ''}
                      trackTransport={transport || ''}
                      key={id}
                    />
                  ))
              : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
