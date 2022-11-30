import React from 'react';
import Marker from './Marker';

import styles from './MarkersBlock.module.scss';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENTERPRISES } from '../../graphql/query/enterprise';
import { IEnterprise } from '../../common/types';

const MarkersBlock: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_ENTERPRISES, {
    variables: {
      pollInterval: 3000,
    },
  });

  if (loading) return <div></div>;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки списка предприятий...</p>
        <p>{error.message}</p>
      </>
    );

  return (
    <div className={styles.markersBlock}>
      {data.getAllEnterprises.map((enterprise: IEnterprise) => (
        <Marker
          value={enterprise.marker?.value || ''}
          position={{
            top: (enterprise.marker?.top || 0) / 100,
            left: (enterprise.marker?.left || 0) / 100,
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          corner={
            data.getAllEnterprises[0].marker?.corner === 'bottom-left' ||
            data.getAllEnterprises[0].marker?.corner === 'top-left' ||
            data.getAllEnterprises[0].marker?.corner === 'top-right' ||
            data.getAllEnterprises[0].marker?.corner === 'bottom-right'
              ? enterprise.marker?.corner
              : 'top-left'
          }
          key={enterprise.id}
          id={enterprise.id}
        />
      ))}
    </div>
  );
};

export default MarkersBlock;
