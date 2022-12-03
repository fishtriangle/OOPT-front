import React from 'react';

import { useQuery } from '@apollo/client';
import {
  IGetOOPT,
  IGetOOPTVars,
  IGetTown,
  IGetTownVars,
  IGetTrack,
  IGetTrackVars,
  IPoint,
} from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { GET_TOWN } from '../../../graphql/query/town';
import { GET_OOPT_POINTS } from '../../../graphql/query/oopt';
import { GET_TRACK } from '../../../graphql/query/track';

const Points: React.FC = () => {
  const navigate = useNavigate();
  const ooptId = Number(useParams().id);
  const townId = Number(useParams().townId);
  const trackId = Number(useParams().trackId);

  const backLocation = useLocation().pathname.split('/').slice(0, -2).join('/');

  let loadedData: IPoint[] | undefined;

  if (townId) {
    const { data, loading, error } = useQuery<IGetTown, IGetTownVars>(
      GET_TOWN,
      {
        variables: {
          pollInterval: 3000,
          townUniqueInput: { id: townId },
        },
      }
    );

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center'}>
            Ошибка загрузки информации о Достопримечательности...
          </p>
          <p>{error.message}</p>
        </>
      );

    loadedData = data?.getTown.points;
  } else if (trackId) {
    const { data, loading, error } = useQuery<IGetTrack, IGetTrackVars>(
      GET_TRACK,
      {
        variables: {
          pollInterval: 3000,
          trackUniqueInput: { id: trackId },
        },
      }
    );

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center'}>
            Ошибка загрузки информации об остановках...
          </p>
          <p>{error.message}</p>
        </>
      );

    loadedData = data?.getTrack.stops;
  } else {
    const { data, loading, error } = useQuery<IGetOOPT, IGetOOPTVars>(
      GET_OOPT_POINTS,
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
            Ошибка загрузки информации о достопримечательностях...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getOOPT.points;
  }

  return (
    <>
      <AdminLayout>
        <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
          <h2 className={'text-uppercase mb-5 text-white'}>
            Список достопримечательностей:
          </h2>
          <button
            type='button'
            className='btn w-fit bg-warning text-black fw-bold me-3 px-5 py-2 mb-5'
            onClick={() => navigate(`/admin/oopts/${ooptId}/towns`)}
          >
            Добавить достопримечательность
          </button>
        </div>

        {loadedData && loadedData.length > 0 && (
          <div
            /*className={`${styles.editPage_tableContainer}`}*/ className={`${
              loadedData.length > 6 && 'add-scrollbar admin-list-h'
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

              <tbody className={'overflow-auto  text-white'}>
                {loadedData.map((item: IPoint, index: number) => (
                  <tr key={item.id}>
                    <td scope={'row'} className={'align-baseline'}>
                      {index + 1}
                    </td>
                    <td className={'align-baseline'}>{item.title}</td>
                    <td className={'d-flex flex-row justify-content-end'}>
                      <Link
                        to={`/admin/oopts/${ooptId}/${
                          townId
                            ? `towns/${townId}/points/${item.id}`
                            : trackId
                            ? `tracks/${trackId}/stops/${item.id}`
                            : `points/${item.id}`
                        }`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Описание
                      </Link>
                      <Link
                        to={`/admin/oopts/${ooptId}/${
                          townId
                            ? `towns/${townId}/points/${item.id}/photos`
                            : trackId
                            ? `tracks/${trackId}/stops/${item.id}/photos`
                            : `points/${item.id}/photos`
                        }`}
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
          onClick={() => navigate(backLocation)}
        >
          Назад
        </button>
      </AdminLayout>

      {/*<MainMenu />*/}
      {/*<DescriptionBlock />*/}
    </>
  );
};
export default Points;
