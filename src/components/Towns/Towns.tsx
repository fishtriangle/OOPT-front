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
import styles from './Towns.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentPointId,
  setCurrentTownId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Towns: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

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

  const handlePointClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentTownId(id));
      dispatch(setBlockType(EnumDescriptionBlock.TOWN));
      dispatch(showBlock());
    }, 1000);
  };

  const towns: ITown[] | undefined = data?.getOOPT.towns;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Населенные пункты</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          towns && towns?.length > 15 && 'add-scrollbar'
        }`}
      >
        {towns
          ? towns.map(({ id, title }) => (
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

export default Towns;
