import AdminLayout from '../../../layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../../graphql/mutations/enterprise';
import { Link, useLocation, useParams } from 'react-router-dom';
import { GET_ONE_ENTERPRISE } from '../../../graphql/query/enterprise';
import Loader from '../../../components/Loader/Loader';
import { readFile } from '../../../utilities/filesInteractions';
import {
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
  IMaster,
  IOOPT,
  IPhoto,
  IPoint,
  IService,
  ITown,
  ITrack,
} from '../../../common/types';
import {
  GET_OOPT_DESCRIPTION,
  GET_OOPT_PHOTOS,
} from '../../../graphql/query/oopt';
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

const Photos = () => {
  const id = Number(useParams().id);
  const townId = Number(useParams().townId);
  const pointId = Number(useParams().pointId);
  const trackId = Number(useParams().trackId);
  const masterId = Number(useParams().masterId);
  const serviceId = Number(useParams().serviceId);
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

  let loadedData:
    | IOOPT
    | ITown
    | IPoint
    | ITrack
    | IMaster
    | IService
    | undefined;

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
    console.log('1');
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

  const photos: IPhoto[] | undefined = loadedData?.photos;

  return (
    <AdminLayout>
      <h3 className={'mb-3 mt-0 fs-1 w-75 align-self-center'}>
        Редактирование фотографий {loadedData?.title}
      </h3>
      <br />
      <form className={'w-75 align-self-center'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-4'}>
          <label htmlFor='photoFiles' className='col-3 col-form-label'>
            Фотографии:
          </label>
          <div className={'col-4'}>
            <input
              className='form-control custom-form'
              type='file'
              ref={photoFileItems}
              multiple={true}
            />
          </div>
          <div className={'col-4 ms-3 mt-1'}>
            jpg или png, не менее 1920*1080px
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
      {photos && photos.length > 0 && (
        <form className={'w-75 mt-3'}>
          <fieldset className={'form-group row'}>
            <legend>Удаление фотографий</legend>
            <div
              className={`col-9 my-0 mx-0 align-self-center ${styles.editPage_carouselContainer}`}
            >
              {photos && photos.length > 6 ? (
                <Carousel
                  className={`mt-2`}
                  renderCenterLeftControls={null}
                  renderCenterRightControls={null}
                  wrapAround={true}
                  slidesToShow={photos.length < 6 ? photos.length : 6}
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
                        src={small}
                        alt={alt}
                        key={id}
                        width={'200px'}
                        // onClick={(event) => handleChoosePhoto(event, id)}
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
                      src={small}
                      alt={alt}
                      key={id}
                      width={'200px'}
                      // onClick={(event) => handleChoosePhoto(event, id)}
                      className={'btn border-0 shadow-none'}
                    />
                  )
                )
              )}
            </div>
            <div className='col-3'>
              <button
                type='button'
                className='btn btn-sm bg-warning px-5 text-black fw-bold mt-4 ms-5'
                // onClick={handleDeletePhotos}
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
