import AdminLayout from '../../../layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import {
  IGetHoliday,
  IGetHolidayVars,
  IGetMaster,
  IGetMasterVars,
  IGetOOPT,
  IGetOOPTVars,
  IGetPoint,
  IGetPointVars,
  IGetService,
  IGetServiceVars,
  IGetTown,
  IGetTownVars,
  IGetTrack,
  IGetTrackVars,
  IHoliday,
  IMaster,
  IOOPT,
  IPhoto,
  IPoint,
  IService,
  ITown,
  ITrack,
} from '../../../common/types';
import { GET_OOPT_PHOTOS } from '../../../graphql/query/oopt';
import styles from '../../Edit.module.scss';
import Carousel from 'nuka-carousel';
import { GET_TOWN_PHOTOS } from '../../../graphql/query/town';
import { GET_POINT_PHOTOS } from '../../../graphql/query/point';
import { GET_TRACK_PHOTOS } from '../../../graphql/query/track';
import { GET_MASTER, GET_MASTER_PHOTOS } from '../../../graphql/query/master';
import {
  GET_SERVICE,
  GET_SERVICE_PHOTOS,
} from '../../../graphql/query/service';
import axios from 'axios';
import handleInputChange from '../../../utilities/handlers';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import { DELETE_PHOTO } from '../../../graphql/mutations/photo';
import { GET_HOLIDAY_PHOTOS } from '../../../graphql/query/holiday';

const Photos = () => {
  const id = Number(useParams().id);
  const townId = Number(useParams().townId);
  const pointId = Number(useParams().pointId);
  const trackId = Number(useParams().trackId);
  const masterId = Number(useParams().masterId);
  const serviceId = Number(useParams().serviceId);
  const holidayId = Number(useParams().holidayId);

  const backLocation = useLocation().pathname.split('/').slice(0, -2).join('/');

  const [alt, setAlt] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const photoFileItems = useRef<HTMLInputElement>(null);

  const [deletePhotos] = useMutation(DELETE_PHOTO);

  let loadedData:
    | IOOPT
    | ITown
    | IPoint
    | ITrack
    | IMaster
    | IService
    | IHoliday
    | undefined;

  let customRefetch: () => any | undefined;

  const chosenPhotos: (number | undefined)[] = [];

  if (pointId) {
    const { data, loading, error, refetch } = useQuery<
      IGetPoint,
      IGetPointVars
    >(GET_POINT_PHOTOS, {
      variables: {
        pollInterval: 3000,
        pointUniqueInput: { id: pointId },
      },
    });
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getPoint;
  } else if (townId) {
    const { data, loading, error, refetch } = useQuery<IGetTown, IGetTownVars>(
      GET_TOWN_PHOTOS,
      {
        variables: {
          pollInterval: 3000,
          townUniqueInput: { id: townId },
        },
      }
    );
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getTown;
  } else if (trackId) {
    const { data, loading, error, refetch } = useQuery<
      IGetTrack,
      IGetTrackVars
    >(GET_TRACK_PHOTOS, {
      variables: {
        pollInterval: 3000,
        trackUniqueInput: { id: trackId },
      },
    });
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getTrack;
  } else if (masterId) {
    const { data, loading, error, refetch } = useQuery<
      IGetMaster,
      IGetMasterVars
    >(GET_MASTER_PHOTOS, {
      variables: {
        pollInterval: 3000,
        masterUniqueInput: { id: masterId },
      },
    });
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getMaster;
  } else if (serviceId) {
    const { data, loading, error, refetch } = useQuery<
      IGetService,
      IGetServiceVars
    >(GET_SERVICE_PHOTOS, {
      variables: {
        pollInterval: 3000,
        serviceUniqueInput: { id: serviceId },
      },
    });
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getService;
  } else if (holidayId) {
    const { data, loading, error, refetch } = useQuery<
      IGetHoliday,
      IGetHolidayVars
    >(GET_HOLIDAY_PHOTOS, {
      variables: {
        pollInterval: 3000,
        holidayUniqueInput: { id: holidayId },
      },
    });
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getHoliday;
  } else {
    const { data, loading, error, refetch } = useQuery<IGetOOPT, IGetOOPTVars>(
      GET_OOPT_PHOTOS,
      {
        variables: {
          pollInterval: 3000,
          ooptUniqueInput: { id },
        },
      }
    );
    customRefetch = refetch;

    if (loading) return <Loader />;
    if (error)
      return (
        <>
          <p className={'text-center text-black'}>
            Ошибка загрузки фотографий...
          </p>
          <p>{error.message}</p>
        </>
      );
    loadedData = data?.getOOPT;
  }

  const handleFormSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    if (
      photoFileItems.current?.files &&
      photoFileItems.current?.files.length > 0
    ) {
      const dataDescription = description;
      const dataAlt = alt;
      let dataParent: string | undefined;
      let dataParentId: string | undefined;
      if (pointId) {
        dataParent = 'point';
        dataParentId = `${pointId}`;
      } else if (townId) {
        dataParent = 'town';
        dataParentId = `${townId}`;
      } else if (trackId) {
        dataParent = 'track';
        dataParentId = `${trackId}`;
      } else if (masterId) {
        dataParent = 'master';
        dataParentId = `${masterId}`;
      } else if (serviceId) {
        dataParent = 'service';
        dataParentId = `${serviceId}`;
      } else if (holidayId) {
        dataParent = 'holiday';
        dataParentId = `${holidayId}`;
      } else {
        dataParent = 'oopt';
        dataParentId = `${id}`;
      }

      for (let i = 0; i < photoFileItems.current.files.length; i += 1) {
        if (dataParent) {
          if (dataParentId) {
            const formData = new FormData();
            formData.append('image', photoFileItems.current.files[i]);
            formData.append('alt', dataAlt || '');
            formData.append('description', dataDescription || '');
            formData.append('parentId', dataParentId);
            formData.append('parent', dataParent);
            axios
              .post(
                process.env.REACT_APP_API_URL_UPLOAD ||
                  'http://localhost:4000/upload/photo',
                formData
              )
              .then(() => {
                if (
                  photoFileItems.current &&
                  photoFileItems.current.files &&
                  i === photoFileItems.current.files.length - 1
                ) {
                  photoFileItems.current.value = '';
                  setTimeout(() => {
                    customRefetch();
                  }, 1500);
                }
                setAlertSuccess('Изменения успешно внесены');
                setAlertDanger(null);
                setAlt('');
                setDescription('');
              })
              .catch((e) => {
                setAlertSuccess(null);
                setAlertDanger(JSON.stringify(e.message));
                console.error(e);
              });
          }
        }
      }
    }
  };

  const handleChoosePhoto = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number
  ) => {
    const found = chosenPhotos.find((photoId) => photoId === id);
    if (found) {
      _.remove(chosenPhotos, (photoId) => photoId === id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.target.style.opacity = 1;
    } else {
      chosenPhotos.push(id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.target.style.opacity = 0.5;
    }
  };

  const handleDeletePhotos = () => {
    setAlertDanger('');
    for (let i = 0; i < chosenPhotos.length; i += 1) {
      setTimeout(() => {
        deletePhotos({
          variables: { deletePhotoId: chosenPhotos[i] },
        })
          .then(() => {
            customRefetch();

            if (alertDanger === '') {
              setAlertSuccess('Изменения успешно внесены');
            }
          })
          .catch((e) => {
            setAlertSuccess(null);
            setAlertDanger(JSON.stringify(e.message));
            console.error(e);
          });
      }, 10 + i * 500);
    }
  };

  const photos: IPhoto[] | undefined = loadedData?.photos;

  return (
    <AdminLayout>
      {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
      {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

      <h3 className={'mb-3 mt-0 fs-1 w-75 align-self-center'}>
        Редактирование фотографий {loadedData?.title}
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-3'}>
          <label htmlFor={'photosAlt'} className='col-3 col-form-label'>
            Альтернативный текст:
          </label>
          <div className={'col-3'}>
            <input
              id={'photosAlt'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handleInputChange(event, setAlt)}
              value={alt ?? ''}
            />
          </div>
          <label
            htmlFor={'photosDescription'}
            className='col-3 col-form-label pe-4 text-end'
          >
            Описание:
          </label>
          <div className={'col-3'}>
            <input
              id={'photosDescription'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handleInputChange(event, setDescription)}
              value={description ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row'}>
          <label htmlFor='photoFiles' className='col-3 col-form-label'>
            Фотографии:
          </label>
          <div className={'col-4'}>
            <input
              className='form-control custom-form'
              type='file'
              accept={'image/*'}
              ref={photoFileItems}
              multiple={true}
            />
          </div>
          <div className={'col-4 ms-3 mt-1'}>
            jpg или png, не менее 3800*2000px
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
            to={`${backLocation}`}
            className={'btn btn-lg btn-outline-warning text-warning px-4'}
          >
            Отмена
          </Link>
        </div>
      </form>
      <br />
      {photos && photos.length > 0 && (
        <form className={'w-75 mt-3 align-self-center'}>
          <fieldset className={'form-group row'}>
            <legend>Удаление фотографий</legend>
            <div
              className={`col-10 my-0 mx-0 align-self-center ${styles.editPage_carouselContainer}`}
            >
              {photos && photos.length > 5 ? (
                <Carousel
                  className={`mt-2`}
                  renderCenterLeftControls={null}
                  renderCenterRightControls={null}
                  wrapAround={true}
                  slidesToShow={5}
                  defaultControlsConfig={{
                    pagingDotsClassName: styles.editPage_carouselDots,
                    pagingDotsContainerClassName:
                      styles.editPage_carouselDotsContainer,
                  }}
                >
                  {photos.map(
                    ({
                      id,
                      small,
                      alt,
                    }: {
                      id: number;
                      small?: string;
                      alt?: string;
                    }) => (
                      <img
                        src={`${
                          process.env.REACT_APP_API_URL_STATIC ||
                          'http://localhost:4000'
                        }/${small}`}
                        alt={alt}
                        key={id}
                        width={'400px'}
                        onClick={(event) => handleChoosePhoto(event, id)}
                        className={'btn border-0 shadow-none'}
                      />
                    )
                  )}
                </Carousel>
              ) : (
                photos.map(
                  ({
                    id,
                    small,
                    alt,
                  }: {
                    id: number;
                    small?: string;
                    alt?: string;
                  }) => (
                    <img
                      src={`${
                        process.env.REACT_APP_API_URL_STATIC ||
                        'http://localhost:4000'
                      }/${small}`}
                      alt={alt}
                      key={id}
                      width={'400px'}
                      onClick={(event) => handleChoosePhoto(event, id)}
                      className={'btn border-0 shadow-none'}
                    />
                  )
                )
              )}
            </div>
            <div className='col-2'>
              <button
                type='button'
                className='btn btn-sm bg-warning px-5 text-black fw-bold mt-4 ms-5'
                onClick={handleDeletePhotos}
              >
                Удалить
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </AdminLayout>
  );
};

export default Photos;
