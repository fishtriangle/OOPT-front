import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetTrack,
  IGetTrackVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import styles from './Track.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';
import { GET_TRACK } from '../../graphql/query/track';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectCurrentTrackId,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Track: React.FC = () => {
  const trackId = useSelector(selectCurrentTrackId);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetTrack, IGetTrackVars>(
    GET_TRACK,
    {
      variables: {
        pollInterval: 3000,
        trackUniqueInput: { id: trackId },
      },
    }
  );

  const handleBackClick = () => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setBlockType(EnumDescriptionBlock.TRACKS));
      dispatch(showBlock());
    }, 1000);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Маршруте...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getTrack.photos;

  return (
    <div className={'text-black'}>
      <div className={'d-flex flex-nowrap justify-content-between'}>
        <div className={styles.h1}>
          <p className={styles.h1}>{data?.getTrack.title}</p>
        </div>
        <p className={styles.back} onClick={handleBackClick}>
          К списку маршрутов
        </p>
      </div>

      <br />
      <div
        className={`${styles.text} ${
          !photos || photos.length === 0
            ? styles.text__long
            : styles.text__short
        } add-scrollbar`}
      >
        <Text>{data?.getTrack.description}</Text>
        <br />
        <p>
          <b>Тип маршрута – </b>
          {data?.getTrack.type}
        </p>
        <p>
          <b>Протяженность – </b>
          {data?.getTrack.length}
        </p>
        <p>
          <b>Способ передвижения – </b>
          {data?.getTrack.transport}
        </p>
        <p>
          <b>Предполагаемое время прохождения маршрута – </b>
          {data?.getTrack.timeInTrack}
        </p>
        <p>
          <b>Сезонность –</b>
          {data?.getTrack.season}
        </p>
        <p>
          <b>Источники питьевой воды – </b>
          {data?.getTrack.water}
        </p>
        <p>
          <b>Места стоянок – </b>
          {data && data.getTrack.stops.length > 0
            ? data?.getTrack.stops.map(({ title }) => title).join(', ')
            : 'отсутствуют'}
        </p>
      </div>
      <div className={'mb-5 mx-3 w-90 align-self-center'}>
        {photos && photos.length > 0 && (
          <Carousel
            className={`mt-2`}
            renderCenterLeftControls={null}
            renderCenterRightControls={null}
            wrapAround={true}
            slidesToShow={4}
            defaultControlsConfig={{
              pagingDotsClassName: styles.enterpriseBlock_carouselDots,
              pagingDotsContainerClassName:
                styles.enterpriseBlock_carouselContainer,
            }}
          >
            {photos.map(
              ({
                id,
                small,
                alt,
              }: {
                id: number;
                small?: string;
                alt?: string;
              }) => (
                <img
                  src={small}
                  alt={alt}
                  key={id}
                  width={'200px'}
                  // onClick={() =>
                  //   dispatch(
                  //     setImages({
                  //       images: data?.getEnterprise.photos,
                  //       currentImage: id,
                  //     })
                  //   )
                  // }
                  className={'btn border-0 shadow-none'}
                />
              )
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Track;
