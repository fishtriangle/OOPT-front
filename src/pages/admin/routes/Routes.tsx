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

const Routes = () => {
  const id = Number(useParams().id);
  const trackId = Number(useParams().trackId);
  const backLocation = useLocation().pathname.split('/').slice(0, -2).join('/');

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
          Ошибка загрузки информации о маршруте...
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
      <div className={'d-flex flex-row flex-nowrap justify-content-between'}>
        <h3 className={'mb-3 mt-0 fs-1 w-75 align-self-center'}>
          Редактирование точек маршрута {data?.getTrack.title}
        </h3>

        <button
          type={'submit'}
          className={'btn btn-lg bg-warning fw-bold me-4 px-4 my-auto'}
        >
          Добавить точку
        </button>
      </div>

      <br />
      <form
        className={`w-75 align-self-center h-80 ${
          data?.getTrack.axises &&
          data?.getTrack.axises.length > 6 &&
          'add-scrollbar'
        }`}
        onSubmit={handleFormSubmit}
      >
        {data?.getTrack.axises &&
          data?.getTrack.axises.map((axis, index) => (
            <div className={'form-group row mb-2'} key={axis.id}>
              <label className='col-1 col-form-label text-white text-end'>
                {index + 1}:
              </label>
              <label
                htmlFor={`axisTitle${axis.id}`}
                className='col-2 col-form-label text-center'
              >
                Имя точки:
              </label>
              <div className={'col-5'}>
                <input
                  id={`axisTitle${axis.id}`}
                  className={'form-control custom-form'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handelInputChange(event, setTitle)}
                  value={title ?? axis.title ?? ''}
                />
              </div>
              <label
                htmlFor={`trackX${axis.id}`}
                className='col-1 col-form-label text-center'
              >
                Широта:
              </label>
              <div className={'col-1'}>
                <input
                  id={`trackX${axis.id}`}
                  className={'form-control custom-form'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handelInputChange(event, setTitle)}
                  value={title ?? axis.axisX ?? ''}
                />
              </div>
              <label
                htmlFor={`trackY${axis.id}`}
                className='col-1 col-form-label text-center'
              >
                Долгота:
              </label>
              <div className={'col-1'}>
                <input
                  id={`trackY${axis.id}`}
                  className={'form-control custom-form'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) => handelInputChange(event, setTitle)}
                  value={title ?? axis.axisY ?? ''}
                />
              </div>
            </div>
          ))}

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

export default Routes;
