import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { GET_OOPT_MASTERS } from '../../../graphql/query/oopt';
import {
  CREATE_MASTER,
  DELETE_MASTER,
  UPDATE_MASTER,
} from '../../../graphql/mutations/masters';
import { Alert, Modal } from 'react-bootstrap';

const Tracks: React.FC = () => {
  const navigate = useNavigate();

  const ooptId = Number(useParams().id);

  const [createMaster] = useMutation(CREATE_MASTER);
  const [deleteMaster] = useMutation(DELETE_MASTER);
  const [updateMaster] = useMutation(UPDATE_MASTER);

  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_MASTERS,
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
          Ошибка загрузки информации о мастерах...
        </p>
        <p>{error.message}</p>
      </>
    );

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    handler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    handler(event.target.value);
  };

  const handleCreateMaster = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const data = {
      title: title || undefined,
      description: modifiedDescription,
      parentId: ooptId,
    };

    createMaster({
      variables: { data },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
        setShow(false);
        setTitle('');
        setDescription('');
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
        setShow(false);
        setTitle('');
        setDescription('');
      });
  };

  const handleDisableMaster = async (
    event: React.MouseEvent<HTMLButtonElement>,
    masterId: number,
    isDisabled: boolean | undefined
  ) => {
    event.preventDefault();

    const data = {
      id: masterId,
      disabled: !isDisabled,
    };

    updateMaster({
      variables: { data },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
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

  const handleDeleteMaster = async (
    event: React.MouseEvent<HTMLButtonElement>,
    masterId: number
  ) => {
    event.preventDefault();

    deleteMaster({
      variables: { deleteMasterId: masterId },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
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

  const loadedData = data?.getOOPT.masters;

  return (
    <>
      <AdminLayout>
        {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
        {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

        <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
          <h2 className={'text-uppercase mb-5 text-white'}>Список мастеров:</h2>
          <button
            type='button'
            className='btn w-fit bg-warning text-black fw-bold me-3 px-5 py-2 mb-5'
            onClick={() => setShow(true)}
          >
            Добавить информацию о мастерах
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
                  <th scope={'col'}>Мастер</th>
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
                      <button
                        type='button'
                        className='btn btn-sm bg-warning text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) =>
                          handleDisableMaster(event, item.id, item.disabled)
                        }
                      >
                        {item.disabled ? 'Включить' : 'Отключить'}
                      </button>
                      <Link
                        to={`/admin/oopts/${ooptId}/masters/${item.id}`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Описание
                      </Link>
                      <Link
                        to={`/admin/oopts/${ooptId}/masters/${item.id}/photos`}
                        className='btn btn-sm bg-white text-black fw-bold me-3 px-3 py-2 my-2'
                      >
                        Фотографии
                      </Link>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) => handleDeleteMaster(event, item.id)}
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
          onClick={() => navigate(`/admin`)}
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
              Добавить информацию о мастере
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <form
            className={'w-75 align-self-center m-auto'}
            onSubmit={handleCreateMaster}
          >
            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'masterTitle'}
                className='text-black fw-bold col-3 col-form-label'
              >
                ФИО Мастера:
              </label>
              <div className={'col-9'}>
                <input
                  id={'masterTitle'}
                  className={'form-control custom-form text-black'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handleInputChange(event, setTitle)}
                  value={title ?? ''}
                />
              </div>
            </div>

            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'masterDescription'}
                className='col-3 col-form-label text-black fw-bold'
              >
                Описание деятельности:
              </label>
              <div className={'col-9'}>
                <textarea
                  id={'masterDescription'}
                  rows={12}
                  placeholder={'Напишите текст здесь...'}
                  className={
                    'text-black form-control custom-form add-scrollbar'
                  }
                  onChange={(event) => handleInputChange(event, setDescription)}
                  value={description ?? ''}
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
export default Tracks;
