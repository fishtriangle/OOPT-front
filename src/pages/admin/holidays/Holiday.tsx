import AdminLayout from '../../../layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../../graphql/mutations/enterprise';
import { Link, useParams } from 'react-router-dom';
import { GET_ONE_ENTERPRISE } from '../../../graphql/query/enterprise';
import Loader from '../../../components/Loader/Loader';
import { readFile } from '../../../utilities/filesInteractions';
import {
  IGetEnterprise,
  IGetEnterpriseVars,
  IGetHoliday,
  IGetHolidayVars,
  IGetOOPT,
  IGetOOPTVars,
  IPhoto,
} from '../../../common/types';
import { GET_OOPT_DESCRIPTION } from '../../../graphql/query/oopt';
import styles from '../../Edit.module.scss';
import Carousel from 'nuka-carousel';
import { GET_HOLIDAY } from '../../../graphql/query/holiday';
import { UPDATE_HOLIDAY } from '../../../graphql/mutations/holiday';
import { Alert } from 'react-bootstrap';

const Holiday = () => {
  const id = Number(useParams().id);
  const holidayId = Number(useParams().holidayId);

  const [updateHoliday] = useMutation(UPDATE_HOLIDAY);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<
    IGetHoliday,
    IGetHolidayVars
  >(GET_HOLIDAY, {
    variables: {
      pollInterval: 3000,
      holidayUniqueInput: { id: holidayId },
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center text-black'}>
          Ошибка загрузки информации о празднике...
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

    updateHoliday({
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
        Редактирование описания празника
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'holidayTitle'} className='col-3 col-form-label'>
            Название праздника:
          </label>
          <div className={'col-9'}>
            <input
              id={'holidayTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getHoliday.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label
            htmlFor={'holidayDescription'}
            className='col-3 col-form-label'
          >
            Описание праздника:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'holidayDescription'}
              rows={12}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getHoliday.description ?? ''}
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
            to={`/admin/oopts/${id}/holidays`}
            className={'btn btn-lg btn-outline-warning text-warning px-4'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Holiday;
