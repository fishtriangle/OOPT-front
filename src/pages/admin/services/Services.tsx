import React from 'react';

import { useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { GET_OOPT_SERVICES } from '../../../graphql/query/oopt';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const ooptId = Number(useParams().id);

  const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_SERVICES,
    {
      variables: {
        pollInterval: 3000,
        ooptUniqueInput: { id: ooptId },
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
  const loadedData = data?.getOOPT.services;

  return (
    <>
      <AdminLayout>
        <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
          <h2 className={'text-uppercase mb-5 text-white'}>Список компаний:</h2>
          <button
            type='button'
            className='btn w-fit bg-warning text-black fw-bold me-3 px-5 py-2 mb-5'
            onClick={() => navigate(`/admin/oopts/${ooptId}/towns`)}
          >
            Добавить компанию
          </button>
        </div>

        {loadedData && loadedData.length > 0 && (
          <div
            /*className={`${styles.editPage_tableContainer}`}*/ className={`${
              loadedData.length > 10 && 'add-scrollbar admin-list-h'
            }`}
          >
            <table className={'table text-primary border-primary'}>
              <thead className={'text-white'}>
                <tr>
                  <th scope={'col'}>#</th>
                  <th scope={'col'}>Наименование</th>
                  <th scope={'col'}></th>
                </tr>
              </thead>

              <tbody className={'overflow-auto text-white'}>
                {loadedData.map((item, index: number) => (
                  <tr key={item.id}>
                    <td scope={'row'} className={'align-baseline'}>
                      {index + 1}
                    </td>
                    <td className={'align-baseline'}>{item.title}</td>
                    <td className={'d-flex flex-row justify-content-end'}>
                      <Link
                        to={`/admin/oopts/${ooptId}/services/${item.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Описание
                      </Link>
                      <Link
                        to={`/admin/oopts/${ooptId}/services/${item.id}/photos`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Фотографии
                      </Link>
                      <button
                        type='button'
                        className='btn btn-sm bg-warning text-black fw-bold me-3 px-3 py-2 my-2'
                        // onClick={() =>
                        //   handleDeleteEnterpriseClick(enterprise.id)
                        // }
                      >
                        {item.disabled ? 'Включить' : 'Отключить'}
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
          onClick={() => navigate(`/admin`)}
        >
          Назад
        </button>
      </AdminLayout>

      {/*<MainMenu />*/}
      {/*<DescriptionBlock />*/}
    </>
  );
};
export default Services;
