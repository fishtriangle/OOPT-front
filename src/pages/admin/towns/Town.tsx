import AdminLayout from '../../../layouts/AdminLayout';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { IGetTown, IGetTownVars } from '../../../common/types';
import { GET_TOWN } from '../../../graphql/query/town';
import { UPDATE_TOWN } from '../../../graphql/mutations/town';
import { UPDATE_AXIS } from '../../../graphql/mutations/axis';
import { Alert } from 'react-bootstrap';

const Town = () => {
  const id = Number(useParams().id);
  const townId = Number(useParams().townId);

  const [updateTown] = useMutation(UPDATE_TOWN);
  const [updateAxis] = useMutation(UPDATE_AXIS);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [markerY, setMarkerY] = useState<string | null>(null);
  const [markerX, setMarkerX] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);
  const [invalidX, setInvalidX] = useState<boolean>(false);
  const [invalidY, setInvalidY] = useState<boolean>(false);

  const { data, loading, error, refetch } = useQuery<IGetTown, IGetTownVars>(
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
        <p className={'text-center text-black'}>
          Ошибка загрузки информации о населенном пункте...
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
    setAlertDanger(null);
    let validationErrors = false;

    if (markerY !== null && !Number(markerY)) {
      setInvalidY(true);
      validationErrors = true;
    } else {
      setInvalidY(false);
      validationErrors = false;
    }

    if (markerX !== null && !Number(markerX)) {
      setInvalidX(true);
      validationErrors = true;
    } else {
      setInvalidX(false);
      validationErrors = false;
    }

    if (validationErrors) {
      setAlertDanger('Координаты должны быть числом');
      return;
    }

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const townData = {
      id: townId,
      title: title || undefined,
      description: modifiedDescription,
    };

    const axisData = {
      id: data?.getTown.axis[0].id,
      title: undefined,
      axisX: Number(markerX) || undefined,
      axisY: Number(markerY) || undefined,
    };

    updateTown({
      variables: { data: townData },
    })
      .then(() =>
        updateAxis({
          variables: { data: axisData },
        })
      )
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
        Редактирование описания населенного пункта
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'townTitle'} className='col-3 col-form-label'>
            Название населенного пункта:
          </label>
          <div className={'col-9'}>
            <input
              id={'townTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTown.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'townDescription'} className='col-3 col-form-label'>
            Описание населенного пункта:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'townDescription'}
              rows={8}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getTown.description ?? ''}
            />
          </div>
        </div>
        <br />

        <h5>Координаты маркера на карте</h5>
        <div className={'form-group row mb-2'}>
          <div className={'col-1'}></div>
          <label
            htmlFor={'markerTop'}
            className='col-2 col-form-label ps-5 pe-2'
          >
            Широта:
          </label>
          <div className={'col-1'}>
            <input
              id={'markerTop'}
              className={`form-control custom-form ${invalidY && 'is-invalid'}`}
              placeholder={'Y'}
              onChange={(event) => handelInputChange(event, setMarkerY)}
              value={markerY ?? data?.getTown.axis[0].axisY ?? ''}
            />
          </div>
          <div className={'col-1'}></div>
          <label className={'col-2 col-form-label ps-5 pe-2'}>Долгота:</label>
          <div className={'col-1'}>
            <input
              id={'markerLeft'}
              className={`form-control custom-form ${invalidX && 'is-invalid'}`}
              placeholder={'X'}
              onChange={(event) => handelInputChange(event, setMarkerX)}
              value={markerX ?? data?.getTown.axis[0].axisX ?? ''}
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
            to={`/admin/oopts/${id}/towns`}
            className={'btn btn-lg btn-outline-warning text-warning px-4'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Town;
