import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars } from '../../common/types';
import { GET_OOPT_ABOUT } from '../../graphql/query/oopt';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import OOPTItem from '../OOPTItem/OOPTItem';

const AboutOOPT: React.FC = () => {
  const ooptIndex = 2;

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_ABOUT,
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
        <p className={'text-center'}>Ошибка загрузки информации об ООПТ...</p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getOOPT.photos;

  return (
    <OOPTItem title={data?.getOOPT.title || ''} photos={photos}>
      <Text>{data?.getOOPT.description}</Text>
    </OOPTItem>
  );
};

export default AboutOOPT;
