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
            <table className={'table text-primary border-primary fs-2'}>
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
                    <td className={'align-baseline'}>{oopt.title}</td>
                    <td className={'d-flex flex-row justify-content-end'}>
                      <Link
                        to={`/admin/oopts/${oopt.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Описание и фотографии
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/towns`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Населенные пункты
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/points`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Достопримечательности
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/tracks`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Маршруты
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/masters`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Мастера
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/services`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Компании
                      </Link>
                      <Link
                        to={`/admin/oopts/${oopt.id}/holidays`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
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
