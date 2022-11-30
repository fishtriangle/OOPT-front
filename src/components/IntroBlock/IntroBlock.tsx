import React from 'react';
import { Link } from 'react-router-dom';

import YellowBtn from '../YellowBtn/YellowBtn';
// import {
//   hideRightBlock,
//   setAbout,
//   showRightBlock,
// } from '../../redux/slices/descriptionBlockSlice';
import logo from './logo.png';
import styles from './IntroBlock.module.scss';
import { useAppDispatch } from '../../redux/store';

const IntroBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  // function handleClick(): void {
  //   dispatch(hideRightBlock());
  //   setTimeout(() => {
  //     dispatch(setAbout());
  //     dispatch(showRightBlock());
  //   }, 1500);
  // }
  return (
    <div
      className={`d-flex justify-content-center flex-column me-5 text-white`}
    >
      <div className={`mb-4 block-bg`}>
        <img
          src={logo}
          alt={'logo'}
          className={`align-self-center mb-3 ${styles.IntroBlock_logo}`}
        />
        <p className={'fw-bold text-primary text-uppercase'}>
          Ты готов участвовать в масштабных проектах?
        </p>
        <p className={''}>
          Тебя драйвят новые амбициозные цели и интересные задачи?
        </p>
        <p className={''}>
          Ты хочешь быть частью команды, нацеленной на успех?
        </p>
        <p className={''}>
          Прямо сейчас у тебя есть возможность построить Компанию будущего
          вместе с нами. Присоединяйся!
        </p>
        <p className={'m-0'}>Мы предлагаем:</p>
        <ul style={{ listStyleType: 'none' }} className={'p-0'}>
          <li>— стабильный высокий доход</li>
          <li>— работу в команде настоящих профессионалов</li>
          <li>— карьерный рост</li>
          <li>— комфортные социально-бытовые условия</li>
          <li>— бонусы и социальные гарантии</li>
        </ul>
        <p className={'m-0 text-uppercase'}>
          Выбирай предприятие, жми на кнопку{' '}
          <Link
            to={'edit/enterprise'}
            className={'text-decoration-none text-white'}
          >
            «Вакансии»
          </Link>{' '}
          и стань частью нашей команды!
        </p>
      </div>
      <div className={'d-flex justify-content-center'}>
        {/*<YellowBtn text={'О компании'} onClick={() => handleClick()} />*/}
      </div>
    </div>
  );
};

export default IntroBlock;
