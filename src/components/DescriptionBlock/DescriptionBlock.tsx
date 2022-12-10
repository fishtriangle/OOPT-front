import React from 'react';
import styles from './DescriptonBlock.module.scss';
import { useSelector } from 'react-redux';
import {
  selectDescriptionBlockIsHide,
  selectType,
} from '../../redux/slices/descriptionBlockSlice';
import AboutOOPT from '../AboutOOPT/AboutOOPT';
import { useAppDispatch } from '../../redux/store';
import Tracks from '../Tracks/Tracks';
import { EnumDescriptionBlock } from '../../common/types';
import { Track } from '../Track/Track';
import PointsBlock from '../PointsBlock/PointsBlock';
import Point from '../Point/Point';
import Towns from '../Towns/Towns';
import Masters from '../Masters/Masters';
import Services from '../Services/Services';
import Town from '../Town/Town';
import Master from '../Master/Master';
import Service from '../Service/Service';
import Holidays from '../Holidays/Holidays';
import Holiday from '../Holiday/Holiday';
import CloseNBackBtn from '../CloseNBackBtn/CloseNBackBtn';

const DescriptionBlock: React.FC = () => {
  const isHide = useSelector(selectDescriptionBlockIsHide);

  const blockType = useSelector(selectType);

  const blockMap = {
    [EnumDescriptionBlock.ABOUT]: <AboutOOPT />,
    [EnumDescriptionBlock.TRACKS]: <Tracks />,
    [EnumDescriptionBlock.TRACK]: <Track />,
    [EnumDescriptionBlock.POINTS]: <PointsBlock />,
    [EnumDescriptionBlock.POINT]: <Point />,
    [EnumDescriptionBlock.TOWNS]: <Towns />,
    [EnumDescriptionBlock.TOWN]: <Town />,
    [EnumDescriptionBlock.MASTERS]: <Masters />,
    [EnumDescriptionBlock.MASTER]: <Master />,
    [EnumDescriptionBlock.SERVICE]: <Services />,
    [EnumDescriptionBlock.SERVICE_ITEM]: <Service />,
    [EnumDescriptionBlock.HOLIDAYS]: <Holidays />,
    [EnumDescriptionBlock.HOLIDAY]: <Holiday />,
  };

  return (
    <div className={`${styles.container} ${isHide && styles.container__hide}`}>
      <CloseNBackBtn />
      <div className={styles.container_inner}>
        {blockMap[blockType] ?? null}
      </div>
    </div>
  );
};
export default DescriptionBlock;
