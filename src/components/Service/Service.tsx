import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetPoint,
  IGetPointVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import styles from './Service.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectCurrentPointId,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { GET_POINT } from '../../graphql/query/point';

const Service: React.FC = () => {
  const pointId = useSelector(selectCurrentPointId);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetPoint, IGetPointVars>(
    GET_POINT,
    {
      variables: {
        pollInterval: 3000,
        pointUniqueInput: { id: pointId },
      },
    }
  );

  const handleBackClick = () => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setBlockType(EnumDescriptionBlock.POINTS));
      dispatch(showBlock());
    }, 1000);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Достопримечательности...
        </p>
        <p>{error.message}</p>
      </>
    );

  console.log('4: ', data?.getPoint);
  const photos = data?.getPoint.photos;

  return (
    <div className={'text-black'}>
      <div className={'d-flex flex-nowrap justify-content-between'}>
        <div className={styles.h1}>
          <p className={styles.h1}>{data?.getPoint.title}</p>
        </div>
        <p className={styles.back} onClick={handleBackClick}>
          К списку маршрутов
        </p>
      </div>

      <br />
      <div className={`${styles.text}`}>
        <Text>{data?.getPoint.description}</Text>
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

export default Service;
