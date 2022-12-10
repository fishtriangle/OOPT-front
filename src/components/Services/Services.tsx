import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IService,
} from '../../common/types';
import { GET_OOPT_SERVICES } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import OOPTItemsList from '../OOPTItemsList/OOPTItemsList';
import { setCurrentServiceId } from '../../redux/slices/descriptionBlockSlice';

const Services: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_SERVICES,
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
        <p className={'text-center'}>
          Ошибка загрузки информации о компаниях...
        </p>
        <p>{error.message}</p>
      </>
    );

  const services: IService[] | undefined = data?.getOOPT.services.filter(
    ({ disabled }) => !disabled
  );

  return (
    <OOPTItemsList
      title={'Туристические компании'}
      list={services || []}
      listType={EnumDescriptionBlock.SERVICE_ITEM}
      dispatchFunction={setCurrentServiceId}
    />
  );
};

export default Services;
