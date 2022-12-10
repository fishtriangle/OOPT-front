import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetPoint, IGetPointVars } from '../../common/types';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import { useSelector } from 'react-redux';
import { selectCurrentPointId } from '../../redux/slices/descriptionBlockSlice';
import { GET_POINT } from '../../graphql/query/point';
import OOPTItem from '../OOPTItem/OOPTItem';

const Point: React.FC = () => {
  const pointId = useSelector(selectCurrentPointId);

  const { data, loading, error } = useQuery<IGetPoint, IGetPointVars>(
    GET_POINT,
    {
      variables: {
        pollInterval: 3000,
        pointUniqueInput: { id: pointId },
      },
    }
  );

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

  const photos = data?.getPoint.photos;

  return (
    <OOPTItem title={data?.getPoint.title || ''} photos={photos}>
      <Text>{data?.getPoint.description}</Text>
    </OOPTItem>
  );
};

export default Point;
