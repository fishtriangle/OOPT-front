import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IHoliday,
} from '../../common/types';
import { GET_OOPT_HOLIDAYS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import { setCurrentHolidayId } from '../../redux/slices/descriptionBlockSlice';
import OOPTItemsList from '../OOPTItemsList/OOPTItemsList';

const Holidays: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_HOLIDAYS,
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
          Ошибка загрузки информации о праздниках...
        </p>
        <p>{error.message}</p>
      </>
    );

  const holidays: IHoliday[] | undefined = data?.getOOPT.holidays.filter(
    ({ disabled }) => !disabled
  );

  return (
    <OOPTItemsList
      title={'Праздники'}
      list={holidays || []}
      listType={EnumDescriptionBlock.HOLIDAY}
      dispatchFunction={setCurrentHolidayId}
    />
  );
};

export default Holidays;
