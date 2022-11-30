import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars } from '../../common/types';
import { GET_OOPT_ABOUT } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import styles from './AboutOOPT.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';

const AboutOOPT: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_ABOUT,
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

  const photos = data?.getOOPT.photos;

  return (
    <div className={'text-black'}>
      <p className={styles.h1}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.text} ${
          !photos || photos.length === 0
            ? styles.text__long
            : styles.text__short
        } add-scrollbar`}
      >
        <Text>{data?.getOOPT.description}</Text>
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

export default AboutOOPT;
