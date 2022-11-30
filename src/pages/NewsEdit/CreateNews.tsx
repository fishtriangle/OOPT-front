import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_NEWS } from '../../graphql/mutations/news';
import { readFile } from '../../utilities/filesInteractions';
import { IInputPhoto } from '../../common/types';

const CreateNews: React.FC = () => {
  const [createNews] = useMutation(CREATE_NEWS);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const [errors, setError] = useState<string | null>(null);

  const photoFileItems = useRef<HTMLInputElement>(null);

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

    if (!title) {
      setError('* Обязательное поле');
      return;
    }
    setError(null);

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

    const input = {
      title: title || undefined,
      description: description || undefined,
      date: date ? `${date}T00:00:00.000Z` : undefined,
      photos: photos,
    };

    createNews({
      variables: { input },
    })
      .then(({ data }) => {
        alert(JSON.stringify(data.createNews.content));
        navigate('/edit/news');
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <h3 className={'w-75 mb-4'}>Создание новости</h3>
      <form className={'w-75'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'newsDate'} className='col-3 col-form-label'>
            Дата публикации:
          </label>
          <div className={'col-3'}>
            <input
              id={'newsDate'}
              type={'date'}
              className={'form-control'}
              onChange={(event) => handelInputChange(event, setDate)}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor={'newsTitle'} className='col-3 col-form-label'>
            Заголовок новости:
          </label>
          <div className={'col-7'}>
            <input
              id={'newsTitle'}
              className={`form-control ${errors && 'is-invalid'}`}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
            />
          </div>
          <div className={`col-2 ps-2 small ${errors && 'text-danger'}`}>
            {errors ? errors : '* Должно быть уникальным'}
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label htmlFor='newsDescription' className='col-3 col-form-label'>
            Текст новости:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'newsDescription'}
              rows={5}
              placeholder={'Напишите текст здесь...'}
              className={'form-control'}
              onChange={(event) => handelInputChange(event, setDescription)}
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

        <div className={'form-group row mb-2'}>
          <button
            type={'submit'}
            className={'btn btn-lg form-control bg-warning fw-bold'}
          >
            Опубликовать
          </button>
        </div>
        <div className={'d-flex justify-content-center'}>
          <Link
            to={'/edit/news'}
            className={'btn bg-none text-primary border-0 shadow-none mx-auto'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateNews;
