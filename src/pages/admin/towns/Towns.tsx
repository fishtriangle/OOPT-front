import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars, ITown } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { GET_OOPT_TOWNS } from '../../../graphql/query/oopt';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { UPDATE_TOWN } from '../../../graphql/mutations/town';
import { Alert } from 'react-bootstrap';

const Towns: React.FC = () => {
  const navigate = useNavigate();
  const id = Number(useParams().id);

  const [updateService] = useMutation(UPDATE_TOWN);

  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
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

  const handleDisableTown = async (
    event: React.MouseEvent<HTMLButtonElement>,
    townId: number,
    isDisabled: boolean | undefined
  ) => {
    event.preventDefault();

    const data = {
      id: townId,
      disabled: !isDisabled,
    };

    updateService({
      variables: { data },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
      });
  };

  const towns: ITown[] | undefined = data?.getOOPT.towns;

  return (
    <>
      <AdminLayout>
        {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
        {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

        <h2 className={'text-uppercase mb-5 text-white'}>
          Список населенных пунктов:
        </h2>
        {towns && towns.length > 0 && (
          <div className={`${towns.length > 6 && 'add-scrollbar h-63'}`}>
            <table className={'table text-primary border-primary'}>
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
                      <button
                        type='button'
                        className='btn btn-sm bg-warning text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) =>
                          handleDisableTown(event, town.id, town.disabled)
                        }
                      >
                        {town.disabled ? 'Включить' : 'Отключить'}
                      </button>
                      <Link
                        to={`/admin/oopts/${id}/towns/${town.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Описание
                      </Link>
                      <Link
                        to={`/admin/oopts/${id}/towns/${town.id}/photos`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Фотографии
                      </Link>
                      <Link
                        to={`/admin/oopts/${id}/towns/${town.id}/points`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Достопримечательности
                      </Link>
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
