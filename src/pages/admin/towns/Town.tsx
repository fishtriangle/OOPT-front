import AdminLayout from '../../../layouts/AdminLayout';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../../graphql/mutations/enterprise';
import { Link, useParams } from 'react-router-dom';
import { GET_ONE_ENTERPRISE } from '../../../graphql/query/enterprise';
import Loader from '../../../components/Loader/Loader';
import { readFile } from '../../../utilities/filesInteractions';
import {
  IGetOOPT,
  IGetOOPTVars,
  IGetTown,
  IGetTownVars,
  IPhoto,
} from '../../../common/types';
import { GET_OOPT_DESCRIPTION } from '../../../graphql/query/oopt';
import styles from '../../Edit.module.scss';
import Carousel from 'nuka-carousel';
import { GET_TOWN } from '../../../graphql/query/town';

const Town = () => {
  const id = Number(useParams().id);
  const townId = Number(useParams().townId);

  // const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [contacts, setContacts] = useState<string | null>(null);
  const [markerValue, setMarkerValue] = useState<string | null>(null);
  const [markerTop, setMarkerTop] = useState<string | null>(null);
  const [markerLeft, setMarkerLeft] = useState<string | null>(null);
  const [markerCorner, setMarkerCorner] = useState<string | null>(null);

  const photoFileItems = useRef<HTMLInputElement>(null);

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

  const photos: IPhoto[] | undefined = data?.getTown.photos;

  console.log('town: ', data?.getTown);
  return (
    <AdminLayout>
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
              className={'form-control custom-form'}
              placeholder={'Y'}
              onChange={(event) => handelInputChange(event, setMarkerTop)}
              value={markerTop ?? data?.getTown.axis[0].axisY ?? ''}
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
              value={markerLeft ?? data?.getTown.axis[0].axisX ?? ''}
            />
          </div>
        </div>

        {/*<div className={'form-group row mb-4'}>*/}
        {/*  <label htmlFor='photoFiles' className='col-3 col-form-label'>*/}
        {/*    Фотографии:*/}
        {/*  </label>*/}
        {/*  <div className={'col-4'}>*/}
        {/*    <input*/}
        {/*      className='form-control custom-form'*/}
        {/*      type='file'*/}
        {/*      ref={photoFileItems}*/}
        {/*      multiple={true}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className={'col-4 ms-3 mt-1'}>*/}
        {/*    jpg или png, не менее 1920*1080px*/}
        {/*  </div>*/}
        {/*</div>*/}
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
      {/*{photos && photos.length > 0 && (*/}
      {/*  <form className={'w-75 mt-3'}>*/}
      {/*    <fieldset className={'form-group row'}>*/}
      {/*      <legend>Удаление фотографий</legend>*/}
      {/*      <div*/}
      {/*        className={`col-9 my-0 mx-0 align-self-center ${styles.editPage_carouselContainer}`}*/}
      {/*      >*/}
      {/*        {photos && photos.length > 6 ? (*/}
      {/*          <Carousel*/}
      {/*            className={`mt-2`}*/}
      {/*            renderCenterLeftControls={null}*/}
      {/*            renderCenterRightControls={null}*/}
      {/*            wrapAround={true}*/}
      {/*            slidesToShow={photos.length < 6 ? photos.length : 6}*/}
      {/*            defaultControlsConfig={{*/}
      {/*              pagingDotsClassName: styles.editPage_carouselDots,*/}
      {/*              pagingDotsContainerClassName:*/}
      {/*                styles.editPage_carouselDotsContainer,*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            {photos.map(*/}
      {/*              ({*/}
      {/*                id,*/}
      {/*                small,*/}
      {/*                alt,*/}
      {/*              }: {*/}
      {/*                id: number;*/}
      {/*                small?: string;*/}
      {/*                alt?: string;*/}
      {/*              }) => (*/}
      {/*                <img*/}
      {/*                  src={small}*/}
      {/*                  alt={alt}*/}
      {/*                  key={id}*/}
      {/*                  width={'200px'}*/}
      {/*                  // onClick={(event) => handleChoosePhoto(event, id)}*/}
      {/*                  className={'btn border-0 shadow-none'}*/}
      {/*                />*/}
      {/*              )*/}
      {/*            )}*/}
      {/*          </Carousel>*/}
      {/*        ) : (*/}
      {/*          photos.map(*/}
      {/*            ({*/}
      {/*              id,*/}
      {/*              small,*/}
      {/*              alt,*/}
      {/*            }: {*/}
      {/*              id: number;*/}
      {/*              small?: string;*/}
      {/*              alt?: string;*/}
      {/*            }) => (*/}
      {/*              <img*/}
      {/*                src={small}*/}
      {/*                alt={alt}*/}
      {/*                key={id}*/}
      {/*                width={'200px'}*/}
      {/*                // onClick={(event) => handleChoosePhoto(event, id)}*/}
      {/*                className={'btn border-0 shadow-none'}*/}
      {/*              />*/}
      {/*            )*/}
      {/*          )*/}
      {/*        )}*/}
      {/*      </div>*/}
      {/*      <div className='col-3'>*/}
      {/*        <button*/}
      {/*          type='button'*/}
      {/*          className='btn btn-sm bg-warning px-5 text-black fw-bold mt-4 ms-5'*/}
      {/*          // onClick={handleDeletePhotos}*/}
      {/*        >*/}
      {/*          Удалить*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </fieldset>*/}
      {/*  </form>*/}
      {/*)}*/}
    </AdminLayout>
  );
};

export default Town;
