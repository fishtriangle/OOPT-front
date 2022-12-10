import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  ITown,
} from '../../common/types';
import { GET_OOPT_TOWNS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import OOPTItemsList from '../OOPTItemsList/OOPTItemsList';
import { setCurrentTownId } from '../../redux/slices/descriptionBlockSlice';

const Towns: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_TOWNS,
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
          Ошибка загрузки информации о населенных пунктах...
        </p>
        <p>{error.message}</p>
      </>
    );

  const towns: ITown[] | undefined = data?.getOOPT.towns.filter(
    ({ disabled }) => !disabled
  );

  return (
    <OOPTItemsList
      title={'Населённые пункты'}
      list={towns || []}
      listType={EnumDescriptionBlock.TOWN}
      dispatchFunction={setCurrentTownId}
    />
  );
};

export default Towns;
