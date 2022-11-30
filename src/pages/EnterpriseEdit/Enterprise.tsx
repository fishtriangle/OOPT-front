import React, { useRef, useState } from 'react';
import styles from '../Edit.module.scss';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_ENTERPRISE,
  DELETE_ENTERPRISE,
} from '../../graphql/mutations/enterprise';
import { GET_ALL_ENTERPRISES } from '../../graphql/query/enterprise';
import Loader from '../../components/Loader/Loader';
import { IEnterprise } from '../../common/types';

const Enterprise: React.FC = () => {
  const [createEnterprise] = useMutation(CREATE_ENTERPRISE);
  const [deleteEnterprise] = useMutation(DELETE_ENTERPRISE);
  const enterpriseName = useRef<HTMLInputElement>(null);

  const [errors, setError] = useState<{ create: string | null }>({
    create: null,
  });

  const { data, loading, error, refetch } = useQuery(GET_ALL_ENTERPRISES, {
    variables: {
      pollInterval: 3000,
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки списка предприятий...</p>
        <p>{error.message}</p>
      </>
    );

  const handleCreateEnterpriseClick = () => {
    if (!enterpriseName.current?.value) {
      setError({
        create: 'Введите название',
      });
    } else {
      setError({
        create: null,
      });
      createEnterprise({
        variables: { input: { title: enterpriseName.current?.value } },
      })
        .then(({ data }) => {
          refetch().catch((e) => console.error(e));
          alert(JSON.stringify(data.createEnterprise.content));
        })
        .catch((e) => console.error(e));
      enterpriseName.current.value = '';
    }
  };

  const handleDeleteEnterpriseClick = (index: number) => {
    deleteEnterprise({
      variables: { deleteEnterpriseId: index },
    })
      .then(({ data }) => {
        refetch().catch((e) => console.error(e));
        alert(JSON.stringify(data.deleteEnterprise.content));
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <form className={'w-75'}>
        <div className={'form-group row'}>
          <label htmlFor={'enterpriseTitle'} className='col-3 col-form-label'>
            Создание предприятия:
          </label>
          <div className={'col-4'}>
            <input
              id={'enterpriseTitle'}
              className={`form-control ${errors.create && 'is-invalid'}`}
              placeholder={'Название предприятия'}
              ref={enterpriseName}
            />
          </div>
          <div className={'col-3'}>
            <button
              type={'button'}
              className={`btn bg-warning px-5 text-black fw-bold ms-3`}
              onClick={handleCreateEnterpriseClick}
            >
              Создать
            </button>
          </div>
        </div>
        <div className={'form-group row'}>
          <div className={'col-3'} />
          {errors.create && (
            <div className={'col-2 small text-danger fw-bold pt-2'}>
              {errors.create}
            </div>
          )}
        </div>
        <hr />
      </form>

      <div className={`w-75 ${styles.editPage_tableContainer}`}>
        <table className={'table text-primary border-primary'}>
          <thead>
            <tr>
              <th scope={'col'}>#</th>
              <th scope={'col'}>Наименование</th>
              <th scope={'col'}></th>
            </tr>
          </thead>

          <tbody className={'overflow-auto'}>
            {data.getAllEnterprises.map(
              (enterprise: IEnterprise, index: number) => (
                <tr key={enterprise.id}>
                  <td scope={'row'}>{index + 1}</td>
                  <td>{enterprise.title}</td>
                  <td className={'d-flex flex-row justify-content-end'}>
                    <Link
                      to={`/edit/enterprise/${enterprise.id}`}
                      className='btn btn-sm bg-white text-black fw-bold me-3'
                    >
                      Изменить
                    </Link>
                    <Link
                      to={`/edit/enterprise/${enterprise.id}/vacancies`}
                      className='btn btn-sm bg-white text-black fw-bold me-3'
                    >
                      Вакансии
                    </Link>
                    <Link
                      to={`/edit/enterprise/${enterprise.id}/photo`}
                      className='btn btn-sm bg-white text-black fw-bold me-3'
                    >
                      Фотографии
                    </Link>
                    <button
                      type='button'
                      className='btn btn-sm bg-warning text-black fw-bold'
                      onClick={() => handleDeleteEnterpriseClick(enterprise.id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Enterprise;
