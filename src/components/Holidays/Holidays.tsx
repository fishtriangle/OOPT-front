import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IHoliday,
  IMaster,
} from '../../common/types';
import { GET_OOPT_HOLIDAYS } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import styles from './Holidays.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentHolidayId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Holidays: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

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

  const handlePointClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentHolidayId(id));
      dispatch(setBlockType(EnumDescriptionBlock.HOLIDAY));
      dispatch(showBlock());
    }, 1000);
  };

  const holidays: IHoliday[] | undefined = data?.getOOPT.holidays;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Национальные праздники</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          holidays && holidays?.length > 15 && 'add-scrollbar'
        }`}
      >
        {holidays
          ? holidays.map(({ id, title }) => (
              <p
                key={id}
                className={styles.list}
                onClick={() => handlePointClick(id)}
              >
                {title}
              </p>
            ))
          : undefined}
      </div>
    </div>
  );
};

export default Holidays;
