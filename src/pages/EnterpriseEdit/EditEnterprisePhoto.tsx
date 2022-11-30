import React, { useRef } from 'react';
import _ from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import {
  DELETE_PHOTOS,
  UPDATE_ENTERPRISE,
} from '../../graphql/mutations/enterprise';
import { Link, useParams } from 'react-router-dom';
import {
  IGetEnterprise,
  IGetEnterpriseVars,
  IInputPhoto,
  IPhoto,
} from '../../common/types';
import { GET_ONE_ENTERPRISE } from '../../graphql/query/enterprise';
import Loader from '../../components/Loader/Loader';
import { readFile } from '../../utilities/filesInteractions';

const Enterprise: React.FC = () => {
  const id = Number(useParams().id);

  const photoFileItems = useRef<HTMLInputElement>(null);

  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);
  const [deletePhotos] = useMutation(DELETE_PHOTOS);

  const { data, loading, error, refetch } = useQuery<
    IGetEnterprise,
    IGetEnterpriseVars
  >(GET_ONE_ENTERPRISE, {
    variables: {
      pollInterval: 6000,
      id,
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки списка фотографий...</p>
        <p>{error.message}</p>
      </>
    );

  const photos: IPhoto[] | undefined = data?.getEnterprise.photos;

  let choosenPhotos: (number | undefined)[] = [];

  const handleSendPhoto = async (event: React.FormEvent<HTMLFormElement>) => {
    const photos: IInputPhoto[] = [];
    event.preventDefault();
    const files = photoFileItems.current?.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files?.length; i += 1) {
        const photo = {
          img: await readFile(files?.[i], 'base64'),
          alt: `Picture ${i}`,
        };
        photos.push(photo);
      }
      const input = {
        id,
        photos,
      };

      updateEnterprise({
        variables: { input },
      })
        .then(({ data }) => {
          refetch().catch((e) => console.error(e));
          alert(JSON.stringify(data.updateEnterprise.content));
        })
        .catch((e) => console.error(e));
    } else {
      alert('Необходимо выбрать фотографии для загрузки!');
    }
  };

  const handleChoosePhoto = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: number
  ) => {
    const found = choosenPhotos.find((photoId) => photoId === id);
    if (found) {
      _.remove(choosenPhotos, (photoId) => photoId === id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.target.style.opacity = 1;
    } else {
      choosenPhotos.push(id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.target.style.opacity = 0.5;
    }
  };

  const handleDeletePhotos = () => {
    deletePhotos({
      variables: { deletePhotosId: choosenPhotos },
    })
      .then(({ data }) => {
        alert(JSON.stringify(data.updateEnterprise.content));
      })
      .catch((e) => console.error(e));
    choosenPhotos = [];
  };

  return (
    <>
      <form className={'w-75 mx-auto'} onSubmit={handleSendPhoto}>
        <fieldset className={'form-group mb-4'}>
          <legend>Загрузка фотографий</legend>
          <div className={'row'}>
            <label htmlFor='photoFiles' className='col-8 col-form-label'>
              Формат фотографий: jpg или png; размер: не менее 1920x1080px
            </label>
          </div>

          <div className={'row'}>
            <div className={'col-8'}>
              <input
                className='form-control col-8'
                type='file'
                ref={photoFileItems}
                multiple={true}
              />
            </div>
          </div>

          <div className={'row'}>
            <button
              type='submit'
              className='btn bg-white px-5 text-black fw-bold col-3 mt-3'
            >
              Загрузить
            </button>
          </div>
        </fieldset>
      </form>

      {photos && photos.length > 0 && (
        <form className={'w-75 mx-auto'} onSubmit={handleDeletePhotos}>
          <fieldset className={'form-group'}>
            <legend>Удаление фотографий</legend>
            <div className={'row'}>
              <div className={`col-12 my-0 mb-3 align-self-center`}>
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
                      onClick={(event) => handleChoosePhoto(event, id)}
                      className={'btn border-0 shadow-none'}
                    />
                  )
                )}
              </div>
            </div>
            <div className={'row'}>
              <button
                type='submit'
                className='btn bg-warning px-5 text-black fw-bold col-3 me-3'
              >
                Удалить
              </button>
              <div className={'col-4'}>
                <Link
                  to={'/edit/enterprise'}
                  className={'btn btn-outline-warning text-warning px-5'}
                >
                  Отмена
                </Link>
              </div>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default Enterprise;
