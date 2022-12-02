import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetMaster,
  IGetMasterVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import styles from './Master.module.scss';
import Text from '../Text/Text';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectCurrentMasterId,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { GET_MASTER } from '../../graphql/query/master';
import { ListGroup } from 'react-bootstrap';

const Master: React.FC = () => {
  const masterId = useSelector(selectCurrentMasterId);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetMaster, IGetMasterVars>(
    GET_MASTER,
    {
      variables: {
        pollInterval: 3000,
        masterUniqueInput: { id: masterId },
      },
    }
  );

  const handleBackClick = () => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setBlockType(EnumDescriptionBlock.MASTERS));
      dispatch(showBlock());
    }, 1000);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Мастерах...
        </p>
        <p>{error.message}</p>
      </>
    );

  console.log('5: ', data?.getMaster);
  const photos = data?.getMaster.photos;
  const contacts = data?.getMaster.contacts;

  return (
    <div className={'text-black'}>
      <div className={'d-flex flex-nowrap justify-content-between'}>
        <div className={styles.h1}>
          <p className={styles.h1}>{data?.getMaster.title}</p>
        </div>
        <p className={styles.back} onClick={handleBackClick}>
          К списку мастеров
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
        <Text>{data?.getMaster.description}</Text>
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

export default Master;
