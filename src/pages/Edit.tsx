import React, { useState } from 'react';

import styles from './Edit.module.scss';

import { Link, Outlet } from 'react-router-dom';

const Edit: React.FC = () => {
  const [blockContent, setBlockContent] = useState('enterprise');

  return (
    <div
      className={
        'vh-100 vw-100 d-flex align-items-center flex-column position-absolute top-0 bg-black bg-opacity-75'
      }
    >
      <div className={'mx-auto d-flex fs-3 my-5'}>
        <div
          className={`px-4 ${
            blockContent === 'enterprise'
              ? styles.editPage_current
              : styles.editPage_active
          }`}
          onClick={() => setBlockContent('enterprise')}
        >
          <Link to={'/edit/enterprise'} className={'text-decoration-none'}>
            Редактирование предприятий
          </Link>
        </div>
        <div
          className={`px-4 ${
            blockContent === 'news' || blockContent === 'createNews'
              ? styles.editPage_current
              : styles.editPage_active
          }`}
          onClick={() => setBlockContent('news')}
        >
          <Link to={'/edit/news'} className={'text-decoration-none'}>
            Редактирование новостей
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Edit;
