import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_NEWS } from '../../graphql/query/news';
import Loader from '../Loader/Loader';
import styles from './NewsBlock.module.scss';
import CloseBtn from '../CloseBtn/CloseBtn';
// import {
//   hideRightBlock,
//   setAbout,
//   setNewsItem,
//   showRightBlock,
// } from '../../redux/slices/descriptionBlockSlice';
import { setCurrentNews } from '../../redux/slices/currentSlice';
import { useAppDispatch } from '../../redux/store';

const NewsBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useQuery(GET_ALL_NEWS, {
    variables: {
      pollInterval: 3000,
    },
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>Ошибка загрузки списка новостей...</p>
        <p>{error.message}</p>
      </>
    );

  const handleClick = (id: number) => {
    // dispatch(hideRightBlock());
    setTimeout(() => {
      // dispatch(setNewsItem());
      dispatch(setCurrentNews({ currentNews: id }));
      // dispatch(showRightBlock());
    }, 1500);
  };

  const handleCloseClick = () => {
    // dispatch(hideRightBlock());
    setTimeout(() => {
      // dispatch(setAbout());
      // dispatch(showRightBlock());
    }, 1500);
  };

  return (
    <div className={`d-flex justify-content-center flex-column text-white`}>
      <div className={`mb-4 block-bg h-80 w-950p`}>
        <div className={'d-flex flex-row justify-content-end mb-3'}>
          <CloseBtn closeAction={() => handleCloseClick()} />
        </div>
        <div>
          <p className={'text-uppercase text-primary fs-2 fw-bold mb-3'}>
            Новости
          </p>
          <div className={`${styles.NewsBlock_tableContainer}`}>
            <table className={'table text-primary border-primary'}>
              <thead>
                <tr>
                  <th scope={'col'}>Дата</th>
                  <th scope={'col'}>Новость</th>
                  <th scope={'col'}></th>
                </tr>
              </thead>

              <tbody className={'overflow-auto'}>
                {data.getAllNews.map(
                  (newsItem: { id: number; date: Date; title: string }) => (
                    <tr
                      key={newsItem.id}
                      onClick={() => handleClick(newsItem.id)}
                    >
                      <td className={'py-3'}>
                        {newsItem.date
                          .toString()
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('.')}
                      </td>
                      <td className={'py-3 text-white'}>{newsItem.title}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
