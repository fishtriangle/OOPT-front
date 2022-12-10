import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetTown,
  IGetTownVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import { useSelector } from 'react-redux';
import {
  selectCurrentTownId,
  setCurrentPointId,
} from '../../redux/slices/descriptionBlockSlice';

import { GET_TOWN } from '../../graphql/query/town';
import OOPTItem from '../OOPTItem/OOPTItem';
import List from '../List/List';
import { useAppDispatch } from '../../redux/store';
import { setBackAction } from '../../redux/slices/backActionSlice';

const Town: React.FC = () => {
  const townId = useSelector(selectCurrentTownId);

  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetTown, IGetTownVars>(GET_TOWN, {
    variables: {
      pollInterval: 3000,
      townUniqueInput: { id: townId },
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Достопримечательности...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getTown.photos;
  const points = data?.getTown.points;

  return (
    <>
      <OOPTItem
        title={data?.getTown.title || ''}
        photos={photos}
        disableFader={true}
      >
        <Text>{data?.getTown.description}</Text>
        <List
          list={points || []}
          listType={EnumDescriptionBlock.POINT}
          dispatchFunction={setCurrentPointId}
          onClick={() =>
            dispatch(
              setBackAction({ id: townId, type: EnumDescriptionBlock.TOWN })
            )
          }
        />
      </OOPTItem>
    </>
  );
};

export default Town;
