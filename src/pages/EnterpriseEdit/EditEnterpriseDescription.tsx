import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ENTERPRISE } from '../../graphql/mutations/enterprise';
import { Link, useParams } from 'react-router-dom';
import { GET_ONE_ENTERPRISE } from '../../graphql/query/enterprise';
import Loader from '../../components/Loader/Loader';
import { readFile } from '../../utilities/filesInteractions';
import { IGetEnterprise, IGetEnterpriseVars } from '../../common/types';

const EditEnterpriseDescription: React.FC = () => {
  const id = Number(useParams().id);

  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [contacts, setContacts] = useState<string | null>(null);
  const [markerValue, setMarkerValue] = useState<string | null>(null);
  const [markerTop, setMarkerTop] = useState<string | null>(null);
  const [markerLeft, setMarkerLeft] = useState<string | null>(null);
  const [markerCorner, setMarkerCorner] = useState<string | null>(null);

  const logoFileItem = useRef<HTMLInputElement>(null);

  const { data, loading, error, refetch } = useQuery<
    IGetEnterprise,
    IGetEnterpriseVars
  >(GET_ONE_ENTERPRISE, {
    variables: {
      pollInterval: 3000,
      id,
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о предприятии...
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
    let logo: string | ArrayBuffer | null = null;
    event.preventDefault();
    const file = logoFileItem.current?.files?.[0];

    if (file) {
      logo = await readFile(file);
    }

    const modifiedDescription = description
      ? description.split('\n').join('&n')
      : undefined;

    const input = {
      id,
      title: title || undefined,
      logo: logo || undefined,
      description: modifiedDescription,
      contacts: contacts || undefined,
      marker:
        markerValue || markerTop || markerLeft || markerCorner
          ? {
              value: markerValue || undefined,
              top: Number(markerTop) || undefined,
              left: Number(markerLeft) || undefined,
              corner: markerCorner || undefined,
            }
          : undefined,
    };

    updateEnterprise({
      variables: { input },
    })
      .then(({ data }) => {
        refetch().catch((e) => console.error(e));
        alert(JSON.stringify(data.updateEnterprise.content));
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <h3 className={'w-75 mb-3 mt-0'}>Редактирование описания предприятия</h3>
      <form className={'w-75'} onSubmit={handleFormSubmit}>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'enterpriseTitle'} className='col-3 col-form-label'>
            Название предприятия:
          </label>
          <div className={'col-9'}>
            <input
              id={'enterpriseTitle'}
              className={'form-control'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getEnterprise.title ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label
            htmlFor={'enterpriseDescription'}
            className='col-3 col-form-label'
          >
            Описание предприятия:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'enterpriseDescription'}
              rows={3}
              placeholder={'Напишите текст здесь...'}
              className={'form-control'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getEnterprise.description ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <label
            htmlFor={'enterpriseContacts'}
            className='col-3 col-form-label'
          >
            Контактная информация:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'enterpriseContacts'}
              rows={2}
              placeholder={
                'Несколько контактов необходимо разделять символом ";"'
              }
              className={'form-control'}
              onChange={(event) => handelInputChange(event, setContacts)}
              value={contacts ?? data?.getEnterprise.contacts ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-4'}>
          <label htmlFor='logoFile' className='col-3 col-form-label'>
            Обновить логотип:
          </label>
          <div className={'col-4'}>
            <input
              className='form-control'
              type='file'
              ref={logoFileItem}
              multiple={false}
            />
          </div>
          <div className={'col-4 ms-3 mt-1'}></div>
        </div>

        <h5>Маркер на карте</h5>
        <div className={'form-group row mb-2'}>
          <label htmlFor={'markerValue'} className='col-3 col-form-label'>
            Значение маркера:
          </label>
          <div className={'col-3'}>
            <input
              id={'markerValue'}
              className={'form-control'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setMarkerValue)}
              value={markerValue ?? data?.getEnterprise.marker?.value ?? ''}
            />
          </div>
          <label
            htmlFor={'markerTop'}
            className='col-3 col-form-label ps-5 pe-2'
          >
            Координаты - ось Y:
          </label>
          <div className={'col-1'}>
            <input
              id={'markerTop'}
              className={'form-control'}
              placeholder={'Y'}
              onChange={(event) => handelInputChange(event, setMarkerTop)}
              value={markerTop ?? data?.getEnterprise.marker?.top ?? ''}
            />
          </div>
          <label className={'col-1 col-form-label ps-3'}>Ось Х:</label>
          <div className={'col-1'}>
            <input
              id={'markerLeft'}
              className={'form-control'}
              placeholder={'X'}
              onChange={(event) => handelInputChange(event, setMarkerLeft)}
              value={markerLeft ?? data?.getEnterprise.marker?.left ?? ''}
            />
          </div>
        </div>

        <div className={'form-group row mb-2'}>
          <legend className='col-3 col-form-label'>Угол сноски маркера:</legend>
          <div className={'col-2 my-auto '}>
            <input
              type={'radio'}
              id={'bottomRightCorner'}
              className={'me-1'}
              name={'corner'}
              value={'bottom-right'}
              onChange={(event) => handelInputChange(event, setMarkerCorner)}
            />
            <label htmlFor={'bottomRightCorner'}>Снизу-справа</label>
          </div>
          <div className={'col-2 my-auto'}>
            <input
              type={'radio'}
              id={'bottomLeftCorner'}
              className={'me-1'}
              name={'corner'}
              value={'bottom-left'}
              onChange={(event) => handelInputChange(event, setMarkerCorner)}
            />
            <label htmlFor={'bottomLeftCorner'}>Снизу-слева</label>
          </div>
          <div className={'col-2 my-auto'}>
            <input
              type={'radio'}
              id={'topRightCorner'}
              className={'me-1'}
              name={'corner'}
              value={'top-right'}
              onChange={(event) => handelInputChange(event, setMarkerCorner)}
            />
            <label htmlFor={'topRightCorner'}>Сверху-справа</label>
          </div>
          <div className={'col-2 my-auto'}>
            <input
              type={'radio'}
              id={'topLeftCorner'}
              className={'me-1'}
              name={'corner'}
              value={'top-left'}
              onChange={(event) => handelInputChange(event, setMarkerCorner)}
            />
            <label htmlFor={'topLeftCorner'}>Сверху-слева</label>
          </div>
        </div>

        <div className={'mb-2 d-flex justify-content-center'}>
          <button type={'submit'} className={'btn bg-warning fw-bold me-4'}>
            Опубликовать
          </button>
          <Link
            to={'/edit/enterprise'}
            className={'btn btn-outline-warning text-warning'}
          >
            Отмена
          </Link>
        </div>
      </form>
    </>
  );
};

export default EditEnterpriseDescription;
