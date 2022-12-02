import React from 'react';
import { useQuery } from '@apollo/client';
import {
  EnumDescriptionBlock,
  IGetOOPT,
  IGetOOPTVars,
  IService,
} from '../../common/types';
import { GET_OOPT_SERVICES } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import styles from './Services.module.scss';
import {
  hideBlock,
  setBlockType,
  setCurrentPointId,
  setCurrentServiceId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const Services: React.FC = () => {
  const ooptIndex = 2;
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_SERVICES,
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
          Ошибка загрузки информации о компаниях...
        </p>
        <p>{error.message}</p>
      </>
    );

  const handlePointClick = (id: number) => {
    dispatch(hideBlock());
    setTimeout(() => {
      dispatch(setCurrentServiceId(id));
      dispatch(setBlockType(EnumDescriptionBlock.SERVICE_ITEM));
      dispatch(showBlock());
    }, 1000);
  };

  const services: IService[] | undefined = data?.getOOPT.services;

  return (
    <div className={'text-black w-100'}>
      <p className={styles.h1}>Туристические сервисные компании</p>
      <p className={styles.h2}>{data?.getOOPT.title}</p>
      <br />
      <div
        className={`${styles.listBlock} ${
          services && services?.length > 15 && 'add-scrollbar'
        }`}
      >
        {services
          ? services.map(({ id, title }) => (
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

export default Services;
