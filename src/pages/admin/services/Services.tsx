import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { IGetOOPT, IGetOOPTVars } from '../../../common/types';
import Loader from '../../../components/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { GET_OOPT_SERVICES } from '../../../graphql/query/oopt';
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  UPDATE_SERVICE,
} from '../../../graphql/mutations/service';
import { Alert, Modal } from 'react-bootstrap';

const Services: React.FC = () => {
  const navigate = useNavigate();

  const ooptId = Number(useParams().id);

  const [createService] = useMutation(CREATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);

  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
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

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    handler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    handler(event.target.value);
  };

  const handleCreateService = async (
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

    createService({
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

  const handleDisableService = async (
    event: React.MouseEvent<HTMLButtonElement>,
    serviceId: number,
    isDisabled: boolean | undefined
  ) => {
    event.preventDefault();

    const data = {
      id: serviceId,
      disabled: !isDisabled,
    };

    updateService({
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

  const handleDeleteService = async (
    event: React.MouseEvent<HTMLButtonElement>,
    serviceId: number
  ) => {
    event.preventDefault();

    deleteService({
      variables: { deleteServiceId: serviceId },
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

  const loadedData = data?.getOOPT.services;

  return (
    <>
      <AdminLayout>
        {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
        {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

        <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
          <h2 className={'text-uppercase mb-5 text-white'}>Список компаний:</h2>
          <button
            type='button'
            className='btn w-fit bg-warning text-black fw-bold me-3 px-5 py-2 mb-5'
            onClick={() => setShow(true)}
          >
            Добавить компанию
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
                          handleDisableService(event, item.id, item.disabled)
                        }
                      >
                        {item.disabled ? 'Включить' : 'Отключить'}
                      </button>
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
                        className='btn btn-sm btn-danger text-black fw-bold me-3 px-3 py-2 my-2'
                        onClick={(event) => handleDeleteService(event, item.id)}
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
              Добавить компанию
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <form
            className={'w-75 align-self-center m-auto'}
            onSubmit={handleCreateService}
          >
            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'serviceTitle'}
                className='text-black fw-bold col-3 col-form-label'
              >
                Название компании:
              </label>
              <div className={'col-9'}>
                <input
                  id={'serviceTitle'}
                  className={'form-control custom-form text-black'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handleInputChange(event, setTitle)}
                  value={title ?? ''}
                />
              </div>
            </div>

            <div className={'form-group row mb-2'}>
              <label
                htmlFor={'serviceDescription'}
                className='col-3 col-form-label text-black fw-bold'
              >
                Описание компании:
              </label>
              <div className={'col-9'}>
                <textarea
                  id={'serviceDescription'}
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
export default Services;
