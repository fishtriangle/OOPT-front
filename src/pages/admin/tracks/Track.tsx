import AdminLayout from '../../../layouts/AdminLayout';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { IGetTrack, IGetTrackVars } from '../../../common/types';
import { GET_TRACK } from '../../../graphql/query/track';
import { UPDATE_TRACK } from '../../../graphql/mutations/track';
import { Alert } from 'react-bootstrap';

const Track = () => {
  const id = Number(useParams().id);
  const trackId = Number(useParams().trackId);

  const backLocation = useLocation().pathname.split('/').slice(0, -1).join('/');

  const [updateTrack] = useMutation(UPDATE_TRACK);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [transport, setTransport] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [timeInTrack, setTimeInTrack] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);
  const [water, setWater] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<IGetTrack, IGetTrackVars>(
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
        <p className={'text-center text-black'}>
          Ошибка загрузки информации о маршрутах...
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

    const trackData = {
      id: trackId,
      title: title || undefined,
      description: modifiedDescription,
      length: length || undefined,
      season: season || undefined,
      timeInTrack: timeInTrack || undefined,
      transport: transport || undefined,
      type: type || undefined,
      water: water || undefined,
    };

    updateTrack({
      variables: { data: trackData },
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
        Редактирование описания маршрутов
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'trackTitle'} className='col-3 col-form-label'>
            Название маршрута:
          </label>
          <div className={'col-9'}>
            <input
              id={'trackTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'trackDescription'} className='col-3 col-form-label'>
            Описание маршрута:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'trackDescription'}
              rows={8}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getTrack.description ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'trackType'} className='col-3 col-form-label'>
            Тип маршрута:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackType'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setType)}
              value={type ?? data?.getTrack.type ?? ''}
            />
          </div>
          <label
            htmlFor={'trackLength'}
            className='col-3 col-form-label text-center'
          >
            Длина маршрута:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackLength'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setLength)}
              value={length ?? data?.getTrack.length ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'trackTransport'} className='col-3 col-form-label'>
            Тип передвижения:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackTransport'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTransport)}
              value={transport ?? data?.getTrack.transport ?? ''}
            />
          </div>
          <label
            htmlFor={'trackTimeInTrack'}
            className='col-3 col-form-label text-center'
          >
            Продолжительность:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackTimeInTrack'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTimeInTrack)}
              value={timeInTrack ?? data?.getTrack.timeInTrack ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'trackSeason'} className='col-3 col-form-label'>
            Сезон:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackSeason'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setSeason)}
              value={season ?? data?.getTrack.season ?? ''}
            />
          </div>
          <label
            htmlFor={'trackWater'}
            className='col-3 col-form-label text-center'
          >
            Источники воды:
          </label>
          <div className={'col-3'}>
            <input
              id={'trackWater'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setWater)}
              value={water ?? data?.getTrack.water ?? ''}
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
            to={backLocation}
            className={'btn btn-lg btn-outline-warning text-warning px-4'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Track;
