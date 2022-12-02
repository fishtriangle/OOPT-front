import React from 'react';

import styles from './AdminLayout.module.scss';
import logo from './oopt-logo-white.png';
import { useNavigate } from 'react-router-dom';

type Props = { children: React.ReactNode };

const AdminLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`vw-100 vh-100 p-5 d-flex flex-column align-items-center ${styles.background}`}
      >
        <img src={logo} alt={'Логотип ООПТ'} onClick={() => navigate('/')} />

        <div className={'d-flex flex-column w-100 p-5'}>{children}</div>
      </div>
    </>
  );
};
export default AdminLayout;
