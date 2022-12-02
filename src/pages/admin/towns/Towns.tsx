import React from 'react';

import { useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars, ITown } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { GET_OOPT_TOWNS } from '../../../graphql/query/oopt';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

const Towns: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_TOWNS,
    {
      variables: {
        pollInterval: 3000,
        ooptUniqueInput: { id },
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

  const towns: ITown[] | undefined = data?.getOOPT.towns;

  return (
    <>
      <AdminLayout>
        <h2 className={'text-uppercase mb-5 text-white'}>
          Список населенных пунктов:
        </h2>
        {towns && towns.length > 0 && (
          <div
            /*className={`${styles.editPage_tableContainer}`}*/ className={`${
              towns.length > 10 && 'add-scrollbar h-63'
            }`}
          >
            <table className={'table text-primary border-primary fs-2'}>
              <thead className={'text-white'}>
                <tr>
                  <th scope={'col'}>#</th>
                  <th scope={'col'}>Наименование</th>
                  <th scope={'col'}></th>
                </tr>
              </thead>

              <tbody className={'overflow-auto text-white'}>
                {towns.map((town: ITown, index: number) => (
                  <tr key={town.id}>
                    <td scope={'row'} className={'align-baseline'}>
                      {index + 1}
                    </td>
                    <td className={'align-baseline'}>{town.title}</td>
                    <td className={'d-flex flex-row justify-content-end'}>
                      <Link
                        to={`/admin/oopts/${id}/towns/${town.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Описание и фотографии
                      </Link>
                      <Link
                        to={`/admin/oopts/${id}/towns/${town.id}/points`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                      >
                        Достопримечательности
                      </Link>
                      <button
                        type='button'
                        className='btn btn-sm bg-warning text-black fw-bold me-3 px-3 fs-5 py-2 my-2'
                        // onClick={() =>
                        //   handleDeleteEnterpriseClick(enterprise.id)
                        // }
                      >
                        {town.disabled ? 'Включить' : 'Отключить'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <br />
        <button
          type='button'
          className='btn align-self-center w-fit bg-warning text-black fw-bold me-3 px-6 fs-3 py-2 '
          onClick={() => navigate('/admin')}
        >
          Назад
        </button>
      </AdminLayout>

      {/*<MainMenu />*/}
      {/*<DescriptionBlock />*/}
    </>
  );
};
export default Towns;
