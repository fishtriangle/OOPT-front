import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../Edit.module.scss';

import Carousel from 'nuka-carousel';

import { useMutation, useQuery } from '@apollo/client';
import { DELETE_NEWS_PHOTO, UPDATE_NEWS } from '../../graphql/mutations/news';
import { IGetNews, IGetNewsVars, IInputPhoto } from '../../common/types';
import Loader from '../../components/Loader/Loader';
import { GET_ONE_NEWS } from '../../graphql/query/news';
import { readFile } from '../../utilities/filesInteractions';
import _ from 'lodash';

const EditNews: React.FC = () => {
  const id = Number(useParams().id);

  const [updateNews] = useMutation(UPDATE_NEWS);
  const [deletePhotos] = useMutation(DELETE_NEWS_PHOTO);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const photoFileItems = useRef<HTMLInputElement>(null);

  const { data, loading, error, refetch } = useQuery<IGetNews, IGetNewsVars>(
    GET_ONE_NEWS,
    {
      variables: {
        pollInterval: 3000,
        id,
      },
    }
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки новости...</p>
        <p>{error.message}</p>
      </>
    );

  const photos:
    | {
        id: number;
        small?: string | undefined;
        large?: string | undefined;
        alt?: string | undefined;
        authorId?: string | undefined;
      }[]
    | undefined = data?.getNews.photos;

  let choosenPhotos: (number | undefined)[] = [];

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

    const photos: IInputPhoto[] = [];

    const files = photoFileItems.current?.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files?.length; i += 1) {
        const photo = {
          img: await readFile(files?.[i], 'base64'),
          alt: `Picture ${i}`,
        };
        photos.push(photo);
      }
    }

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const input = {
      id,
      title: title || undefined,
      description: modifiedDescription,
      date: date ? `${date}T00:00:00.000Z` : undefined,
      photos: photos,
    };

    updateNews({
      variables: { input },
    })
      .then(({ data }) => {
        alert(JSON.stringify(data.updateNews.content));
        refetch().catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  };

  const handleDeletePhotos = () => {
    deletePhotos({
      variables: { deleteNewsPhotosId: choosenPhotos },
    })
      .then(({ data }) => {
        alert(JSON.stringify(data.deleteNewsPhotos.content));
        refetch().catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
    choosenPhotos = [];
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

  return (
    <>
      <h3 className={'w-75 mb-4 mt-0'}>Редактирование новости</h3>
      <form className={'w-75'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label className='col-3 col-form-label'>Дата публикации:</label>
          <div className={'col-2'}>
            <input
              type={'date'}
              className={'form-control'}
              value={
                date ?? data?.getNews?.date?.toString().split('T')[0] ?? ''
              }
              onChange={(event) => handelInputChange(event, setDate)}
            />
          </div>
          <label htmlFor={'newsTitle'} className='ps-4 col-3 col-form-label'>
            Заголовок новости:
          </label>
          <div className={'col-4'}>
            <input
              id={'newsTitle'}
              className={'form-control'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getNews?.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor='newsDescription' className='col-3 col-form-label'>
            Текст новости:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'newsDescription'}
              rows={4}
              placeholder={'Напишите текст здесь...'}
              className={'form-control'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getNews?.description ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-4'}>
          <label htmlFor='photoFiles' className='col-3 col-form-label'>
            Фотографии:
          </label>
          <div className={'col-4'}>
            <input
              className='form-control'
              type='file'
              ref={photoFileItems}
              multiple={true}
            />
          </div>
          <div className={'col-4 ms-3 mt-1'}>
            jpg или png, не менее 1920*1080px
          </div>
        </div>
        <div className={'mb-2 d-flex justify-content-center'}>
          <button
            type={'submit'}
            className={'btn btn-lg bg-warning fw-bold me-4 px-4'}
          >
            Опубликовать
          </button>
          <Link
            to={'/edit/news'}
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
                      src={small}
                      alt={alt}
                      key={id}
                      width={'200px'}
                      onClick={(event) => handleChoosePhoto(event, id)}
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
                onClick={handleDeletePhotos}
              >
                Удалить
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default EditNews;
