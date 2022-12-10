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
import OOPTItem from '../OOPTItem/OOPTItem';

const Service: React.FC = () => {
  const serviceId = useSelector(selectCurrentServiceId);

  const { data, loading, error } = useQuery<IGetService, IGetServiceVars>(
    GET_SERVICE,
    {
      variables: {
        pollInterval: 3000,
        serviceUniqueInput: { id: serviceId },
      },
    }
  );

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
    <OOPTItem title={data?.getService.title || ''} photos={photos}>
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
    </OOPTItem>
  );
};

export default Service;
