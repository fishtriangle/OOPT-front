import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IPoint,
} from '../../common/types';
import { GET_OOPT_POINTS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import { setCurrentPointId } from '../../redux/slices/descriptionBlockSlice';
import OOPTItemsList from '../OOPTItemsList/OOPTItemsList';

const PointsBlock: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_POINTS,
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
          Ошибка загрузки информации о достопримечательностях...
        </p>
        <p>{error.message}</p>
      </>
    );

  const points: IPoint[] | undefined = data?.getOOPT.points.filter(
    ({ disabled }) => !disabled
  );

  return (
    <OOPTItemsList
      list={points || []}
      title={'Достопримечательности'}
      listType={EnumDescriptionBlock.POINT}
      dispatchFunction={setCurrentPointId}
    />
  );
};

export default PointsBlock;
