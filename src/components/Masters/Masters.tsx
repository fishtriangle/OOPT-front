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
import styles from './Masters.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentPointId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Masters: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

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

  const handlePointClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      // dispatch(setCurrentPointId(id));
      // dispatch(setBlockType(EnumDescriptionBlock.POINT));
      dispatch(showBlock());
    }, 1000);
  };

  const masters: IMaster[] | undefined = data?.getOOPT.masters;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Мастера традиционных ремесел</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          masters && masters?.length > 15 && 'add-scrollbar'
        }`}
      >
        {masters
          ? masters.map(({ id, title }) => (
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

export default Masters;
