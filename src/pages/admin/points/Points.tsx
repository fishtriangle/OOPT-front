import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
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
import {
  CREATE_POINT,
  DELETE_POINT,
  UPDATE_POINT,
} from '../../../graphql/mutations/point';
import { Alert, Modal } from 'react-bootstrap';

const Points: React.FC = () => {
  const navigate = useNavigate();
  const ooptId = Number(useParams().id);
  const townId = Number(useParams().townId);
  const trackId = Number(useParams().trackId);

  const backLocation = useLocation().pathname.split('/').slice(0, -2).join('/');

  const [createPoint] = useMutation(CREATE_POINT);
  const [deletePoint] = useMutation(DELETE_POINT);
  const [updatePoint] = useMutation(UPDATE_POINT);

  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  let loadedData: IPoint[] | undefined;
  let customRefetch: () => any | undefined;

  if (townId) {
    const { data, loading, error, refetch } = useQuery<IGetTown, IGetTownVars>(
      GET_TOWN,
      {
        variables: {
          pollInterval: 3000,
          townUniqueInput: { id: townId },
        },
      }
    );

    customRefetch = refetch;

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
    const { data, loading, error, refetch } = useQuery<
      IGetTrack,
      IGetTrackVars
    >(GET_TRACK, {
      variables: {
        pollInterval: 3000,
        trackUniqueInput: { id: trackId },
      },
    });

    customRefetch = refetch;

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
    const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
      GET_OOPT_POINTS,
      {
        variables: {
          pollInterval: 3000,
          ooptUniqueInput: { id: ooptId },
        },
      }
    );

    customRefetch = refetch;

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

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    handler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    handler(event.target.value);
  };

  const handleCreatePoint = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const modifiedRoute = route ? route.split('\n').join('&n') : undefined;

    const data = {
      title: title || undefined,
      description: modifiedDescription,
      route: modifiedRoute,
      parent: townId ? 'town' : trackId ? 'track' : 'oopt',
      parentId: townId ? townId : trackId ? trackId : ooptId,
    };

    createPoint({
      variables: { data },
    })
      .then(() => {
        customRefetch().catch((e: any) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
        setShow(false);
        setTitle('');
        setDescription('');
        setRoute('');
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
        setShow(false);
        setTitle('');
        setDescription('');
        setRoute('');
      });
  };

  const handleDisablePoint = async (
    event: React.MouseEvent<HTMLButtonElement>,
    pointId: number,
    isDisabled: boolean | undefined
  ) => {
    event.preventDefault();

    const data = {
      id: pointId,
      disabled: !isDisabled,
    };

    updatePoint({
      variables: { data },
    })
      .then(() => {
        customRefetch().catch((e: any) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
        setShow(false);
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
        setShow(false);
      });
  };

  const handleDeletePoint = async (
    event: React.MouseEvent<HTMLButtonElement>,
    pointId: number
  ) => {
    event.preventDefault();

    deletePoint({
      variables: { deletePointId: pointId },
    })
      .then(() => {
        customRefetch().catch((e: any) => console.error(e));
        setAlertSuccess('Запись удалена');
        setAlertDanger(null);
        setShow(false);
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
        setShow(false);
      });
  };

  return (
    <>
      <AdminLayout>
        {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
        {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

        <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
          <h2 className={'text-uppercase mb-5 text-white'}>
            Список достопримечательностей:
          </h2>
          <button
            type='button'
            className='btn w-fit bg-warning text-black fw-bold me-3 px-5 py-2 mb-5'
            onClick={() => setShow(true)}
          >
            Добавить достопримечательность
          </button>
        </div>

        {loadedData && loadedData.length > 0 && (
          <div
            className={`${
              loadedData.length > 5 && 'add-scrollbar admin-list-h'
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
                      <button
                        type='button'
                        className='btn btn-sm bg-warning text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) =>
                          handleDisablePoint(event, item.id, item.disabled)
                        }
                      >
                        {item.disabled ? 'Включить' : 'Отключить'}
                      </button>
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
                        className='btn btn-sm btn-danger text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) => handleDeletePoint(event, item.id)}
                      >
                        Удалить
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

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName={'custom-modal'}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={'text-black fw-bold m-auto ms-5'}>
              Добавить достопримечательность
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <form
            className={'w-75 align-self-center m-auto'}
            onSubmit={handleCreatePoint}
          >
            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'pointTitle'}
                className='text-black fw-bold col-3 col-form-label'
              >
                Название:
              </label>
              <div className={'col-9'}>
                <input
                  id={'pointTitle'}
                  className={'form-control custom-form text-black'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handleInputChange(event, setTitle)}
                  value={title ?? ''}
                />
              </div>
            </div>

            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'pointDescription'}
                className='col-3 col-form-label text-black fw-bold'
              >
                Описание:
              </label>
              <div className={'col-9'}>
                <textarea
                  id={'pointDescription'}
                  rows={10}
                  placeholder={'Напишите текст здесь...'}
                  className={
                    'text-black form-control custom-form add-scrollbar'
                  }
                  onChange={(event) => handleInputChange(event, setDescription)}
                  value={description ?? ''}
                />
              </div>
            </div>
            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'pointRoute'}
                className='col-3 col-form-label text-black fw-bold'
              >
                Как добраться:
              </label>
              <div className={'col-9'}>
                <textarea
                  id={'pointRoute'}
                  rows={2}
                  placeholder={'Напишите текст здесь...'}
                  className={
                    'text-black form-control custom-form add-scrollbar'
                  }
                  onChange={(event) => handleInputChange(event, setRoute)}
                  value={route ?? ''}
                />
              </div>
            </div>
            <br />

            <div className={'mb-2 d-flex justify-content-center'}>
              <button
                type={'submit'}
                className={'btn btn-lg bg-warning fw-bold me-4 px-4'}
              >
                Опубликовать
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default Points;
