import React, { useState } from 'react';
import styles from './Intro.module.scss';
import logo from './oopt-logo-white.png';
import bistrinskiy from './bistrinskiy2.png';

import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setIsClicked(true);
    setTimeout(() => {
      navigate('/bistrinskiy');
    }, 550);
  }
  return (
    <div
      className={`vw-100 vh-100 p-5 d-flex flex-column align-items-center ${
        styles.background
      } ${isClicked && styles.background__pressed}`}
    >
      <img src={logo} alt={'Логотип ООПТ'} />
      <div className={'flex-grow-1 d-flex'}>
        <img
          src={bistrinskiy}
          alt={'Быстринский природный парк'}
          className={`m-auto ${styles.bistrinskiy} ${
            isClicked && styles.bistrinskiy__pressed
          }`}
          onClick={handleClick}
        />
        {/*<div className={`${styles.steam} ${styles.steam1}`}></div>*/}
        {/*<div className={`${styles.steam} ${styles.steam2}`}></div>*/}
        {/*<div className={`${styles.steam} ${styles.steam3}`}></div>*/}
        {/*<div className={`${styles.steam} ${styles.steam4}`}></div>*/}
      </div>
    </div>
  );
};
export default Intro;
