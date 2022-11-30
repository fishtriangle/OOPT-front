import React, { useEffect } from 'react';
import styles from '../Edit.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { DELETE_NEWS } from '../../graphql/mutations/news';

import { GET_ALL_NEWS } from '../../graphql/query/news';
import Loader from '../../components/Loader/Loader';

const News: React.FC = () => {
  const [deleteNews] = useMutation(DELETE_NEWS);

  const { data, loading, error, refetch } = useQuery(GET_ALL_NEWS, {
    variables: {
      pollInterval: 3000,
    },
  });

  useEffect(() => {
    refetch().catch((e) => console.error(e));
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки списка новостей...</p>
        <p>{error.message}</p>
      </>
    );

  const handleDeleteNewsClick = (index: number) => {
    deleteNews({
      variables: { deleteNewsId: index },
    })
      .then(({ data }) => {
        refetch().catch((e) => console.error(e));
        alert(JSON.stringify(data.deleteNews.content));
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <form className={'w-75'}>
        <div className={'form-group row'}>
          <div className={'col-4'}>
            <Link
              to={'/edit/createNews'}
              className='btn bg-warning px-5 text-black fw-bold'
            >
              Создать новость
            </Link>
          </div>
        </div>
        <hr />
      </form>

      <div className={`w-75 ${styles.editPage_tableContainer}`}>
        <table className={'table text-primary border-primary'}>
          <thead>
            <tr>
              <th scope={'col'}>#</th>
              <th scope={'col'}>Заголовок</th>
              <th scope={'col'}>Дата публикации</th>
              <th scope={'col'}></th>
            </tr>
          </thead>

          <tbody className={'overflow-auto'}>
            {data.getAllNews.map(
              (
                newsItem: { id: number; date: Date; title: string },
                index: number
              ) => (
                <tr key={newsItem.id}>
                  <td scope={'row'}>{index + 1}</td>
                  <td>{newsItem.title}</td>
                  <td>
                    {newsItem.date
                      .toString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('.')}
                  </td>
                  <td>
                    <Link
                      to={`/edit/editNews/${newsItem.id}`}
                      className='btn btn-sm bg-white text-black fw-bold me-2 mb-2'
                    >
                      Редактировать
                    </Link>
                    <button
                      type='button'
                      className='btn btn-sm bg-warning text-black fw-bold mb-2'
                      onClick={() => handleDeleteNewsClick(newsItem.id)}
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

export default News;
