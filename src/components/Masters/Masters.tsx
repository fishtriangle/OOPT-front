import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IMaster,
} from '../../common/types';
import { GET_OOPT_MASTERS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import OOPTItemsList from '../OOPTItemsList/OOPTItemsList';
import { setCurrentMasterId } from '../../redux/slices/descriptionBlockSlice';

const Masters: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_MASTERS,
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
          Ошибка загрузки информации о мастерах...
        </p>
        <p>{error.message}</p>
      </>
    );

  const masters: IMaster[] | undefined = data?.getOOPT.masters.filter(
    ({ disabled }) => !disabled
  );

  return (
    <OOPTItemsList
      title={'Мастера'}
      list={masters || []}
      listType={EnumDescriptionBlock.MASTER}
      dispatchFunction={setCurrentMasterId}
    />
  );
};

export default Masters;
