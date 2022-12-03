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
  IPhoto,
  IPoint,
} from '../../../common/types';
import { GET_OOPT_DESCRIPTION } from '../../../graphql/query/oopt';
import styles from '../../Edit.module.scss';
import Carousel from 'nuka-carousel';
import { GET_TOWN } from '../../../graphql/query/town';
import { GET_POINT } from '../../../graphql/query/point';

const Point = () => {
  const id = Number(useParams().id);
  const townId = Number(useParams().townId);
  const pointId = Number(useParams().pointId);

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

  const { data, loading, error, refetch } = useQuery<IGetPoint, IGetPointVars>(
    GET_POINT,
    {
      variables: {
        pollInterval: 3000,
        pointUniqueInput: { id: pointId },
      },
    }
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center text-black'}>
          Ошибка загрузки информации о достопримечательности...
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
        Редактирование описания достопримечательности
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'pointTitle'} className='col-3 col-form-label'>
            Название достопримечательности:
          </label>
          <div className={'col-9'}>
            <input
              id={'pointTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getPoint.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'pointDescription'} className='col-3 col-form-label'>
            Описание достопримечательности:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'pointDescription'}
              rows={8}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getPoint.description ?? ''}
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
              className={'form-control custom-form'}
              placeholder={'Y'}
              onChange={(event) => handelInputChange(event, setMarkerTop)}
              value={markerTop ?? data?.getPoint.axis[0].axisY ?? ''}
            />
          </div>
          <div className={'col-1'}></div>
          <label className={'col-2 col-form-label ps-5 pe-2'}>Долгота:</label>
          <div className={'col-1'}>
            <input
              id={'markerLeft'}
              className={'form-control custom-form'}
              placeholder={'X'}
              onChange={(event) => handelInputChange(event, setMarkerLeft)}
              value={markerLeft ?? data?.getPoint.axis[0].axisX ?? ''}
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

export default Point;
