import AdminLayout from '../../../layouts/AdminLayout';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { IGetService, IGetServiceVars } from '../../../common/types';
import { GET_SERVICE } from '../../../graphql/query/service';
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
} from '../../../graphql/mutations/contact';
import { UPDATE_SERVICE } from '../../../graphql/mutations/service';
import { Alert } from 'react-bootstrap';

const Service = () => {
  const id = Number(useParams().id);
  const serviceId = Number(useParams().serviceId);

  const [updateService] = useMutation(UPDATE_SERVICE);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [createContact] = useMutation(CREATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [newContact, setNewContact] = useState<string | null>(null);
  const [contacts, setContacts] = useState<string[]>([]);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertDanger, setAlertDanger] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<
    IGetService,
    IGetServiceVars
  >(GET_SERVICE, {
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
          Ошибка загрузки информации о компании...
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

  const handleInputChangeInArray = (
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

    const serviceData = {
      id: serviceId,
      title: title || undefined,
      description: description || undefined,
    };

    const contactsData = data?.getService.contacts.map((contact, index) => ({
      id: contact.id,
      description: contacts[index] || undefined,
    }));

    updateService({
      variables: {
        data: serviceData,
      },
    })
      .then(() => {
        if (contactsData && contactsData.length > 0) {
          const promises: Promise<any>[] = contactsData.map((data) =>
            updateContact({ variables: { data } })
          );
          Promise.all(promises);
        }
      })
      .then(() => {
        refetch().catch((e) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
      });
  };

  const handleCreateContact = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const modifiedDescription = newContact
      ? newContact.split('\n').join('&n')
      : undefined;

    const data = {
      description: modifiedDescription,
      parentId: serviceId,
      parent: 'service',
    };

    createContact({
      variables: { data },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
        setAlertSuccess('Изменения успешно внесены');
        setAlertDanger(null);
        setNewContact('');
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
        setNewContact('');
      });
  };

  const handleDeleteContact = async (
    event: React.MouseEvent<HTMLButtonElement>,
    contactId: number
  ) => {
    event.preventDefault();

    deleteContact({
      variables: { deleteContactId: contactId },
    })
      .then(() => {
        refetch().catch((e) => console.error(e));
        setAlertSuccess('Контакт удален');
        setAlertDanger(null);
      })
      .catch((e) => {
        setAlertSuccess(null);
        setAlertDanger(JSON.stringify(e.message));
        console.error(e);
      });
  };

  return (
    <AdminLayout>
      {alertSuccess && <Alert variant={'success'}>{alertSuccess}</Alert>}
      {alertDanger && <Alert variant={'danger'}>{alertDanger}</Alert>}

      <h3 className={'mb-3 mt-0 fs-1 w-75 align-self-center'}>
        Редактирование информации о компании
      </h3>
      <br />
      <form
        className={`w-75 align-self-center ${
          data?.getService.contacts &&
          data?.getService.contacts.length > 2 &&
          'add-scrollbar admin-list-h-l'
        }`}
        onSubmit={handleFormSubmit}
      >
        <div className={'form-group row mb-2'}>
          <label htmlFor={'serviceTitle'} className='col-3 col-form-label'>
            Компания:
          </label>
          <div className={'col-9'}>
            <input
              id={'serviceTitle'}
              className={'form-control custom-form'}
              placeholder={'Напишите текст здесь...'}
              onChange={(event) => handelInputChange(event, setTitle)}
              value={title ?? data?.getService.title ?? ''}
            />
          </div>
        </div>
        <div className={'form-group row mb-2'}>
          <label
            htmlFor={'serviceDescription'}
            className='col-3 col-form-label'
          >
            Описание деятельности:
          </label>
          <div className={'col-9'}>
            <textarea
              id={'serviceDescription'}
              rows={6}
              placeholder={'Напишите текст здесь...'}
              className={'form-control custom-form add-scrollbar'}
              onChange={(event) => handelInputChange(event, setDescription)}
              value={description ?? data?.getService.description ?? ''}
            />
          </div>
        </div>
        <br />
        Контактная информация:
        <div className={'form-group row my-2'}>
          {data?.getService.contacts &&
            data?.getService.contacts.map((contact, index) => (
              <div className={'col-6 d-flex mb-2'} key={contact.id}>
                <input
                  id={`contactDescription${contact.id}`}
                  className={'form-control custom-form w-70 me-2'}
                  placeholder={'Напишите текст здесь...'}
                  onChange={(event) =>
                    handleInputChangeInArray(
                      event,
                      setContacts,
                      index,
                      contacts
                    )
                  }
                  value={contacts[index] ?? contact.description ?? ''}
                />
                <button
                  type={'button'}
                  className={'btn btn-outline-warning fw-bold me-4 px-4'}
                  onClick={(event) => handleDeleteContact(event, contact.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          <br />
          <div className={'form-group row my-4'}>
            <label htmlFor={'addContact'} className='col-3 col-form-label'>
              Добавить контакт:
            </label>
            <div className={'col-6'}>
              <input
                id={`addContact`}
                className={'form-control custom-form'}
                placeholder={'Напишите текст здесь...'}
                onChange={(event) => handelInputChange(event, setNewContact)}
                value={newContact ?? ''}
              />
            </div>
            <div className={'col-1'}></div>
            <div className={'col-1'}>
              <button
                type={'button'}
                className={'btn btn-outline-warning fw-bold me-4 px-4'}
                onClick={handleCreateContact}
              >
                Добавить
              </button>
            </div>
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
            to={`/admin/oopts/${id}/services`}
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

export default Service;
