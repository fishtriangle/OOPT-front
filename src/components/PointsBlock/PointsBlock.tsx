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
import styles from './PointsBlock.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentPointId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const PointsBlock: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

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

  const handlePointClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentPointId(id));
      dispatch(setBlockType(EnumDescriptionBlock.POINT));
      dispatch(showBlock());
    }, 1000);
  };

  const points: IPoint[] | undefined = data?.getOOPT.points;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Достопримечательности</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          points && points?.length > 15 && 'add-scrollbar'
        }`}
      >
        {points
          ? points.map(({ id, title }) => (
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

export default PointsBlock;
