import React, { useState } from 'react';
import styles from './Legend.module.scss';
import closeBtnImg from './close.png';
import { LegendItem } from './LegendItem';

export const Legend: React.FC = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isSmall, setIsSmall] = useState<boolean>(true);

  const hideClick = () => {
    if (isHide) {
      setIsSmall(true);
      setTimeout(() => {
        setIsHide(false);
      }, 200);
    } else {
      setIsHide(true);
      setTimeout(() => {
        setIsSmall(false);
      }, 600);
    }
  };

  return (
    <>
      <div
        className={`${styles.container} ${isHide && styles.container__hide}`}
      >
        <img
          src={closeBtnImg}
          alt={'close button'}
          width={45}
          height={45}
          className={styles.clsBtn}
          onClick={hideClick}
        />

        <div className={styles.container_inner}>
          <p className={styles.title}>Обозначения</p>
          <div className={'d-flex flex-row flex-nowrap'}>
            <LegendItem image={'office'} label={'Офис парка'} />
            <LegendItem image={'spring'} label={'Термальный источник'} />
            <LegendItem image={'campfire'} label={'Беседка'} />
            <LegendItem image={'camping'} label={'Место для кемпинга'} />
            <LegendItem image={'building'} label={'Строение'} />
          </div>
          <div className={'d-flex flex-row flex-nowrap'}>
            <LegendItem image={'house'} label={'Приют, домик инспектора'} />
            <LegendItem image={'offroad'} label={'Проезд для внедорожника'} />
            <LegendItem image={'sleepingVolcano'} label={'Потухший вулкан'} />
            <LegendItem image={'activeVolcano'} label={'Действующий вулкан'} />
            <LegendItem image={'naturePoint'} label={'Памятник природы'} />
          </div>
        </div>
      </div>
      <p
        className={`${styles.iBtn} ${isSmall && styles.iBtn__hide}`}
        onClick={hideClick}
      >
        i
      </p>
    </>
  );
};
