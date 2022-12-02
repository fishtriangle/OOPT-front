import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetHoliday,
  IGetHolidayVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import styles from './Holiday.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectCurrentHolidayId,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { GET_SERVICE } from '../../graphql/query/service';
import { GET_HOLIDAY } from '../../graphql/query/holiday';

const Holiday: React.FC = () => {
  const holidayId = useSelector(selectCurrentHolidayId);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetHoliday, IGetHolidayVars>(
    GET_HOLIDAY,
    {
      variables: {
        pollInterval: 3000,
        holidayUniqueInput: { id: holidayId },
      },
    }
  );

  const handleBackClick = () => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setBlockType(EnumDescriptionBlock.HOLIDAYS));
      dispatch(showBlock());
    }, 1000);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Праздниках...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getHoliday.photos;

  return (
    <div className={'text-black d-flex flex-column'}>
      <div className={'d-flex flex-nowrap justify-content-between'}>
        <div className={styles.h1}>
          <p className={styles.h1}>{data?.getHoliday.title}</p>
        </div>
        <p className={styles.back} onClick={handleBackClick}>
          К списку праздников
        </p>
      </div>

      <br />
      <div className={`add-scrollbar ${styles.text}`}>
        <Text>{data?.getHoliday.description}</Text>
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

export default Holiday;
