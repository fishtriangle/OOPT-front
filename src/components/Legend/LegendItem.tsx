import React, { useState } from 'react';
import officeImg from './office.png';
import springImg from './spring.png';
import campfireImg from './campfire.png';
import campingImg from './camping.png';
import houseImg from './house.png';
import offroadImg from './offroad.png';
import sleepingVolcanoImg from './sleepingVolcano.png';
import activeVolcanoImg from './activeVolcano.png';
import naturePointImg from './naturePoint.png';
import buildingImg from './building.png';
import style from './Legend.module.scss';

const imgPattern = {
  office: officeImg,
  campfire: campfireImg,
  spring: springImg,
  camping: campingImg,
  house: houseImg,
  offroad: offroadImg,
  sleepingVolcano: sleepingVolcanoImg,
  activeVolcano: activeVolcanoImg,
  naturePoint: naturePointImg,
  building: buildingImg,
};

interface ILegendItem {
  image:
    | 'office'
    | 'campfire'
    | 'spring'
    | 'camping'
    | 'house'
    | 'offroad'
    | 'sleepingVolcano'
    | 'activeVolcano'
    | 'naturePoint'
    | 'building';
  label: string;
}

export const LegendItem: React.FC<ILegendItem> = ({ image, label }) => {
  return (
    <div className={'d-flex flex-row flex-nowrap align-items-bottom me-3 mb-3'}>
      <img src={imgPattern[image]} alt={'logo'} height={90} />
      <p className={style.text}>{label}</p>
    </div>
  );
};
