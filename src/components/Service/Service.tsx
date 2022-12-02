import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetService,
  IGetServiceVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import styles from './Service.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectCurrentServiceId,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { ListGroup } from 'react-bootstrap';
import { GET_SERVICE } from '../../graphql/query/service';

const Service: React.FC = () => {
  const serviceId = useSelector(selectCurrentServiceId);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetService, IGetServiceVars>(
    GET_SERVICE,
    {
      variables: {
        pollInterval: 3000,
        serviceUniqueInput: { id: serviceId },
      },
    }
  );

  const handleBackClick = () => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setBlockType(EnumDescriptionBlock.SERVICE));
      dispatch(showBlock());
    }, 1000);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Компаниях...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getService.photos;
  const contacts = data?.getService.contacts;

  return (
    <div className={'text-black'}>
      <div className={'d-flex flex-nowrap justify-content-between'}>
        <div className={styles.h1}>
          <p className={styles.h1}>{data?.getService.title}</p>
        </div>
        <p className={styles.back} onClick={handleBackClick}>
          К списку компаний
        </p>
      </div>

      <br />
      <div
        className={`${styles.text} ${
          !photos || photos.length === 0
            ? styles.text__long
            : styles.text__short
        }`}
      >
        <Text>{data?.getService.description}</Text>
        <br />
        {contacts && contacts.length > 0 && (
          <div>
            <p className={'fw-bold text-uppercase'}>Контактная информация</p>
            <ListGroup variant='flush'>
              {contacts.map((contact) => (
                <ListGroup.Item key={contact.id}>
                  {contact.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
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
