import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetHoliday,
  IGetHolidayVars,
} from '../../common/types';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import { useSelector } from 'react-redux';
import { selectCurrentHolidayId } from '../../redux/slices/descriptionBlockSlice';
import { GET_HOLIDAY } from '../../graphql/query/holiday';
import OOPTItem from '../OOPTItem/OOPTItem';

const Holiday: React.FC = () => {
  const holidayId = useSelector(selectCurrentHolidayId);

  const { data, loading, error } = useQuery<IGetHoliday, IGetHolidayVars>(
    GET_HOLIDAY,
    {
      variables: {
        pollInterval: 3000,
        holidayUniqueInput: { id: holidayId },
      },
    }
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Праздниках...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getHoliday.photos;

  return (
    <OOPTItem title={data?.getHoliday.title || ''} photos={photos}>
      <Text>{data?.getHoliday.description}</Text>
    </OOPTItem>
  );
};

export default Holiday;
