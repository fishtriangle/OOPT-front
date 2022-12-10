import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetMaster, IGetMasterVars } from '../../common/types';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import { useSelector } from 'react-redux';
import { selectCurrentMasterId } from '../../redux/slices/descriptionBlockSlice';
import { GET_MASTER } from '../../graphql/query/master';
import { ListGroup } from 'react-bootstrap';
import OOPTItem from '../OOPTItem/OOPTItem';

const Master: React.FC = () => {
  const masterId = useSelector(selectCurrentMasterId);

  const { data, loading, error } = useQuery<IGetMaster, IGetMasterVars>(
    GET_MASTER,
    {
      variables: {
        pollInterval: 3000,
        masterUniqueInput: { id: masterId },
      },
    }
  );

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

  const photos = data?.getMaster.photos;
  const contacts = data?.getMaster.contacts;

  return (
    <OOPTItem title={data?.getMaster.title || ''} photos={photos}>
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
    </OOPTItem>
  );
};

export default Master;
