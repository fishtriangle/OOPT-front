import React from 'react';

import { useQuery } from '@apollo/client';
import { IOOPT } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { GET_ALL_OOPTS } from '../../../graphql/query/oopt';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

const Oopts: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_OOPTS, {
    variables: {
      pollInterval: 3000,
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки информации о Парках...</p>
        <p>{error.message}</p>
      </>
    );

  const oopts = data?.getAllOOPTs;

  return (
    <>
      <AdminLayout>
        <h2 className={'text-uppercase mb-5 text-white'}>Список парков:</h2>
        {oopts && oopts.length > 0 && (
          <div /*className={`${styles.editPage_tableContainer}`}*/>
            <table className={'table text-primary border-primary'}>
              <thead className={'text-white'}>
                <tr>
                  <th scope={'col'}>#</th>
                  <th scope={'col'}>Наименование</th>
                  <th scope={'col'}></th>
                </tr>
              </thead>

              <tbody className={'overflow-auto  text-white'}>
                {oopts.map((oopt: IOOPT, index: number) => (
                  <tr key={oopt.id}>
                    <td scope={'row'} className={'align-baseline'}>
                      {index + 1}
                    </td>
                    <td className={'align-baseline p-0'}>{oopt.title}</td>
                    <td className={'d-flex flex-row justify-content-end'}>
                      <Link
                        to={`/admin/oopts/${oopt.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Описание
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/photos`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Фотографии
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/towns`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-1 py-2 my-auto'
                      >
                        Населенные пункты
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/points`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Достопримечательности
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/tracks`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Маршруты
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/masters`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Мастера
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/services`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Компании
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/holidays`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-2 py-2 my-auto'
                      >
                        Праздники
                      </Link>
                      {/*<button*/}
                      {/*  type='button'*/}
                      {/*  className='btn btn-sm bg-warning text-black fw-bold'*/}
                      {/*  // onClick={() =>*/}
                      {/*  //   handleDeleteEnterpriseClick(enterprise.id)*/}
                      {/*  // }*/}
                      {/*>*/}
                      {/*  Удалить*/}
                      {/*</button>*/}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>

      {/*<MainMenu />*/}
      {/*<DescriptionBlock />*/}
    </>
  );
};
export default Oopts;
