import React, { useState } from 'react';

import styles from './AboutBlock.module.scss';
import logo from './logo.png';
import CloseBtn from '../CloseBtn/CloseBtn';
import YellowBtn from '../YellowBtn/YellowBtn';
// import {
//   hideRightBlock,
//   setNews,
//   showRightBlock,
// } from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';

const AboutBlock: React.FC = () => {
  const [showDevelop, setShowDevelop] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // const handleDevelopmentClick = () => {
  //   dispatch(hideRightBlock());
  //   setTimeout(() => {
  //     setShowDevelop(!showDevelop);
  //     dispatch(showRightBlock());
  //   }, 1500);
  // };
  //
  // const handleNewsClick = () => {
  //   dispatch(hideRightBlock());
  //   setTimeout(() => {
  //     dispatch(setNews());
  //     dispatch(showRightBlock());
  //   }, 1500);
  // };

  return (
    <div
      className={`d-flex justify-content-center flex-column me-5 text-white`}
    >
      <div className={`mb-4 block-bg h-75`}>
        <div className={'d-flex flex-row justify-content-between mb-3'}>
          <img
            src={logo}
            alt={'logo'}
            className={`align-self-center my-2 me-1 ${styles.AboutBlock_logo}`}
          />
          <CloseBtn />
        </div>
        {showDevelop ? (
          <div className={'add-scrollbar'}>
            <p className={'text-uppercase text-primary fs-4 fw-bold m-0'}>
              Наши обязательства
            </p>
            <p className={''}>
              Высокая эффективность Highland Gold в контексте достижения
              операционных и финансовых показателей берёт своё начало в принятии
              верных решений и работе Компании с чёткой установкой на устойчивое
              развитие. Имея это в виду, Компания подтверждает принимаемые на
              себя обязательства по непрерывному совершенствованию с целью
              достичь или превзойти лучшие практики, применяемые в
              горно-металлургической отрасли, в плане порядка взаимодействия со
              всеми заинтересованными сторонами, местными сообществами, а также
              регионами присутствия. Мы принимаем во внимание нужды и
              потребности всех заинтересованных сторон, вкладываем средства в
              наши активы, кадры и в местные сообщества, относясь при этом с
              особым вниманием к вопросам охраны труда, промышленной
              безопасности и защиты окружающей среды.
            </p>
            <br />
            <p className={'text-uppercase text-primary fs-4 fw-bold m-0'}>
              Наши люди
            </p>
            <p className={''}>
              Долговременный успех и развитие компании Highland Gold неразрывно
              связаны с долговременной работой на предприятиях нашего персонала,
              с его развитием. Компания предпринимает все усилия для того, чтобы
              наряду со своей производственной деятельностью выступать также в
              роли ответственного бизнеса. Забота о благополучии персонала – это
              одна из наших ключевых ценностей. Наши сотрудники – наш самый
              ценный актив. Только с их помощью мы можем реализовать потенциал
              нашей ресурсной базы.
            </p>
            <br />
            <p className={'text-uppercase text-primary fs-4 fw-bold m-0'}>
              Промышленная безопасность и охрана труда
            </p>
            <p className={''}>
              В Highland Gold безопасность наших сотрудников – наивысший
              приоритет. Нашим целевым показателем в области охраны труда и
              техники безопасности неизменно является нулевой уровень несчастных
              случаев. Мы нацелены на минимизацию производственных рисков, и для
              этого предоставляем нашим сотрудникам широкую программу подготовки
              в области промышленной безопасности. Руководством к действию для
              Highland Gold является Политика Компании в области охраны труда,
              промышленной безопасности и охраны окружающей среды, а также
              Кардинальные правила безопасного поведения, которые являются
              обязательными к применению на всех наших производственных
              объектах. Наша система охраны труда и промышленной безопасности
              полностью соответствует международным сертификационным стандартам.
            </p>
          </div>
        ) : (
          <div className={''}>
            <p className={''}>
              Highland Gold Mining – производитель золота с прочной репутацией,
              управляющий активами мирового класса, расположенными в России.
              Среди них проекты по добыче, освоению и геологоразведке. Компания
              имеет штат первоклассных специалистов в сфере управления и
              эксплуатации, обладающих опытом работы в России и за рубежом, а
              также впечатляющий объем запасов, прошедший аудит в соответствии с
              международной классификацией JORC.
            </p>
            <p className={''}>
              Деятельность Highland Gold сосредоточена вокруг четырёх основных
              производственных центров в Хабаровском, Камчатском и Забайкальском
              краях, а также Чукотском АО. Кроме того, компания является
              собственником активов в Киргизии.
            </p>
          </div>
        )}
      </div>
      <div className={'d-flex justify-content-around'}>
        {/*<YellowBtn*/}
        {/*  text={showDevelop ? 'О Компании' : 'Устойчивое развитие'}*/}
        {/*  // onClick={handleDevelopmentClick}*/}
        {/*/>*/}
        {/*<YellowBtn text={'Новости'} onClick={handleNewsClick} />*/}
      </div>
    </div>
  );
};

export default AboutBlock;
