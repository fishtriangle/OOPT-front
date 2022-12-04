import AdminLayout from '../../../layouts/AdminLayout';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { IGetTrack, IGetTrackVars } from '../../../common/types';
import { GET_TRACK } from '../../../graphql/query/track';
import { UPDATE_AXIS } from '../../../graphql/mutations/axis';
import { Alert } from 'react-bootstrap';

const Routes = () => {
  const id = Number(useParams().id);
  const trackId = Number(useParams().trackId);
  const backLocation = useLocation().pathname.split('/').slice(0, -2).join('/');

  const [updateAxis] = useMutation(UPDATE_AXIS);

  const [title, setTitle] = useState<string[]>([]);
  const [markersY, setMarkersY] = useState<string[]>([]);
  const [markersX, setMarkersX] = useState<string[]>([]);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);
  const [invalidX, setInvalidX] = useState<boolean[]>([]);
  const [invalidY, setInvalidY] = useState<boolean[]>([]);

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

  // let x: string[] = [];
  // let y: string[] = [];
  //
  // if (data?.getTrack.axises) {
  //   x = data?.getTrack.axises.map(({ axisX }) => `${axisX}`);
  //   y = data?.getTrack.axises.map(({ axisY }) => `${axisY}`);
  // }

  const handelInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    handler: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    array: string[]
  ) => {
    const input = [...array];
    input[index] = event.target.value;
    handler(input);
  };

  const handleFormSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setAlertSuccess(null);
    setAlertDanger(null);
    let validationErrors = false;
    setInvalidY([]);
    setInvalidX([]);

    markersY.forEach((markerY, index) => {
      if (!Number(markerY)) {
        setInvalidY((isInvalid) => [...isInvalid, true]);
        validationErrors = true;
      } else {
        setInvalidY((isInvalid) => [...isInvalid, false]);
      }
    });

    markersX.forEach((markerX, index) => {
      if (!Number(markerX)) {
        setInvalidX((isInvalid) => [...isInvalid, true]);
        validationErrors = true;
      } else {
        setInvalidX((isInvalid) => [...isInvalid, false]);
      }
    });

    if (validationErrors) {
      setAlertDanger('Координаты должны быть числом');
      return;
    }

    const axisesData = data?.getTrack.axises.map((axis, index) => ({
      id: axis.id,
      title: title[index] || undefined,
      axisX: Number(markersX[index]) || undefined,
      axisY: Number(markersY[index]) || undefined,
    }));

    if (axisesData) {
      const promises: Promise<any>[] = axisesData.map((data) =>
        updateAxis({ variables: { data } })
      );

      Promise.all(promises)
        .then(() => {
          refetch().catch((e) => console.error(e));
          setAlertSuccess('Изменения успешно внесены');
        })
        .catch((e) => {
          setAlertDanger(JSON.stringify(e.message));
          console.error(e);
        });
    }
  };

  return (
    <AdminLayout>
      {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
      {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

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
                  onChange={(event) =>
                    handelInputChange(event, setTitle, index, title)
                  }
                  value={title[index] ?? axis.title ?? ''}
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
                  className={`form-control custom-form ${
                    invalidX[index] && 'is-invalid'
                  }`}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) =>
                    handelInputChange(event, setMarkersX, index, markersX)
                  }
                  value={markersX[index] ?? axis.axisX ?? ''}
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
                  className={`form-control custom-form ${
                    invalidY[index] && 'is-invalid'
                  }`}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) =>
                    handelInputChange(event, setMarkersY, index, markersY)
                  }
                  value={markersY[index] ?? axis.axisY ?? ''}
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
