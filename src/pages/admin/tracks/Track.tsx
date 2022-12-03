import AdminLayout from '../../../layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../../graphql/mutations/enterprise';
import { Link, useLocation, useParams } from 'react-router-dom';
import { GET_ONE_ENTERPRISE } from '../../../graphql/query/enterprise';
import Loader from '../../../components/Loader/Loader';
import { readFile } from '../../../utilities/filesInteractions';
import {
  IGetOOPT,
  IGetOOPTVars,
  IGetPoint,
  IGetPointVars,
  IGetTown,
  IGetTownVars,
  IGetTrack,
  IGetTrackVars,
  IPhoto,
  IPoint,
} from '../../../common/types';
import { GET_OOPT_DESCRIPTION } from '../../../graphql/query/oopt';
import styles from '../../Edit.module.scss';
import Carousel from 'nuka-carousel';
import { GET_TOWN } from '../../../graphql/query/town';
import { GET_POINT } from '../../../graphql/query/point';
import { GET_TRACK } from '../../../graphql/query/track';

const Track = () => {
  const id = Number(useParams().id);
  const trackId = Number(useParams().trackId);
  const backLocation = useLocation().pathname.split('/').slice(0, -1).join('/');

  // const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [contacts, setContacts] = useState<string | null>(null);
  const [markerValue, setMarkerValue] = useState<string | null>(null);
  const [markerTop, setMarkerTop] = useState<string | null>(null);
  const [markerLeft, setMarkerLeft] = useState<string | null>(null);
  const [markerCorner, setMarkerCorner] = useState<string | null>(null);

  const photoFileItems = useRef<HTMLInputElement>(null);

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
    // let logo: string | ArrayBuffer | null = null;
    // event.preventDefault();
    // const file = logoFileItem.current?.files?.[0];
    //
    // if (file) {
    //   logo = await readFile(file);
    // }
    //
    // const modifiedDescription = description
    //   ? description.split('\n').join('&n')
    //   : undefined;
    //
    // const input = {
    //   id,
    //   title: title || undefined,
    //   logo: logo || undefined,
    //   description: modifiedDescription,
    //   contacts: contacts || undefined,
    //   marker:
    //     markerValue || markerTop || markerLeft || markerCorner
    //       ? {
    //           value: markerValue || undefined,
    //           top: Number(markerTop) || undefined,
    //           left: Number(markerLeft) || undefined,
    //           corner: markerCorner || undefined,
    //         }
    //       : undefined,
    // };
    //
    // updateEnterprise({
    //   variables: { input },
    // })
    //   .then(({ data }) => {
    //     refetch().catch((e) => console.error(e));
    //     alert(JSON.stringify(data.updateEnterprise.content));
    //   })
    //   .catch((e) => console.error(e));
  };

  return (
    <AdminLayout>
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.type ?? ''}
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.length ?? ''}
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.transport ?? ''}
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.timeInTrack ?? ''}
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.season ?? ''}
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
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getTrack.water ?? ''}
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
