import AdminLayout from '../../../layouts/AdminLayout';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

import { IGetOOPT, IGetOOPTVars, IPhoto } from '../../../common/types';
import { GET_OOPT_DESCRIPTION } from '../../../graphql/query/oopt';
import { UPDATE_OOPT } from '../../../graphql/mutations/oopt';
import { Alert } from 'react-bootstrap';

const Oopt = () => {
  const id = Number(useParams().id);

  const [updateOOPT] = useMutation(UPDATE_OOPT);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
    GET_OOPT_DESCRIPTION,
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
        <p className={'text-center text-black'}>
          Ошибка загрузки информации о парке...
        </p>
        <p>{error.message}</p>
      </>
    );

  const handelInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    handler: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    handler(event.target.value);
  };

  const handleFormSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const data = {
      id,
      title: title || undefined,
      description: modifiedDescription,
    };

    updateOOPT({
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

  return (
    <AdminLayout>
      {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
      {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

      <h3 className={'mb-3 mt-0 fs-1 w-75 align-self-center'}>
        Редактирование описания парка
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'ooptTitle'} className='col-3 col-form-label'>
            Название парка:
          </label>
          <div className={'col-9'}>
            <input
              id={'ooptTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getOOPT.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'ooptDescription'} className='col-3 col-form-label'>
            Описание парка:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'ooptDescription'}
              rows={10}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getOOPT.description ?? ''}
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
          <Link
            to={'/admin'}
            className={'btn btn-lg btn-outline-warning text-warning px-4'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Oopt;
