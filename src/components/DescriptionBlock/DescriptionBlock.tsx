import React from 'react';
import styles from './DescriptonBlock.module.scss';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectDescriptionBlockIsHide,
  selectType,
} from '../../redux/slices/descriptionBlockSlice';
import AboutOOPT from '../AboutOOPT/AboutOOPT';
import { useAppDispatch } from '../../redux/store';
import Tracks from '../Tracks/Tracks';
import { EnumDescriptionBlock } from '../../common/types';
import Track from '../Track/Track';
import PointsBlock from '../PointsBlock/PointsBlock';
import Point from '../Point/Point';
import Towns from '../Towns/Towns';
import Masters from '../Masters/Masters';
import Services from '../Services/Services';
import Town from '../Town/Town';
import Master from '../Master/Master';
import Service from '../Service/Service';

const DescriptionBlock: React.FC = () => {
  const isHide = useSelector(selectDescriptionBlockIsHide);
  const dispatch = useAppDispatch();

  const blockType = useSelector(selectType);

  const blockMap = {
    [EnumDescriptionBlock.ABOUT]: <AboutOOPT />,
    [EnumDescriptionBlock.TRACKS]: <Tracks />,
    [EnumDescriptionBlock.POINTS]: <PointsBlock />,
    [EnumDescriptionBlock.TOWNS]: <Towns />,
    [EnumDescriptionBlock.MASTERS]: <Masters />,
    [EnumDescriptionBlock.SERVICE]: <Services />,
    [EnumDescriptionBlock.TRACK]: <Track />,
    [EnumDescriptionBlock.POINT]: <Point />,
    [EnumDescriptionBlock.TOWN]: <Town />,
    [EnumDescriptionBlock.MASTER]: <Master />,
    [EnumDescriptionBlock.SERVICE_ITEM]: <Service />,
  };

  const handleClickHide = () => {
    dispatch(hideBlock());
  };

  return (
    <div className={`${styles.container} ${isHide && styles.container__hide}`}>
      <div className={styles.point} onClick={handleClickHide} />
      {blockMap[blockType] ?? null}
    </div>
  );
};
export default DescriptionBlock;
