import React from 'react';
import styles from './CloseNBackBtn.module.scss';
import {
  hideBlock,
  selectType,
  setBlockType,
  setCurrentTownId,
  setCurrentTrackId,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { EnumDescriptionBlock } from '../../common/types';
import CloseLogo from './close.png';
import BackLogo from './back.png';
import { useSelector } from 'react-redux';
import {
  selectBackAction,
  setBackAction,
} from '../../redux/slices/backActionSlice';

const CloseNBackBtn: React.FC = () => {
  const dispatch = useAppDispatch();

  const customAction = useSelector(selectBackAction);
  const blockType = useSelector(selectType);

  const backMap = {
    [EnumDescriptionBlock.TRACK]: EnumDescriptionBlock.TRACKS,
    [EnumDescriptionBlock.POINT]: EnumDescriptionBlock.POINTS,
    [EnumDescriptionBlock.TOWN]: EnumDescriptionBlock.TOWNS,
    [EnumDescriptionBlock.MASTER]: EnumDescriptionBlock.MASTERS,
    [EnumDescriptionBlock.SERVICE_ITEM]: EnumDescriptionBlock.SERVICE,
    [EnumDescriptionBlock.HOLIDAY]: EnumDescriptionBlock.HOLIDAYS,
    [EnumDescriptionBlock.HOLIDAYS]: null,
    [EnumDescriptionBlock.ABOUT]: null,
    [EnumDescriptionBlock.TRACKS]: null,
    [EnumDescriptionBlock.SERVICE]: null,
    [EnumDescriptionBlock.MASTERS]: null,
    [EnumDescriptionBlock.POINTS]: null,
    [EnumDescriptionBlock.TOWNS]: null,
  };

  const handleClickHide = () => {
    dispatch(hideBlock());
  };

  const handleClickBack = () => {
    if (customAction) {
      dispatch(hideBlock());
      setTimeout(() => {
        dispatch(setCurrentTownId(customAction.id));
        dispatch(setBlockType(customAction.type));
        dispatch(setBackAction(null));
        dispatch(showBlock());
        dispatch(setCurrentTrackId(0));
      }, 1000);
      dispatch(setBackAction(null));
    } else {
      dispatch(hideBlock());
      setTimeout(() => {
        if (backMap[blockType]) {
          dispatch(setBlockType(backMap[blockType]));
          dispatch(setCurrentTrackId(0));
          dispatch(showBlock());
        }
      }, 1000);
    }
  };

  const isBackBtn = !!backMap[blockType];

  return (
    <div
      className={`${styles.btn} ${styles.btn_back}`}
      onClick={isBackBtn ? handleClickBack : handleClickHide}
    >
      <img
        src={isBackBtn ? BackLogo : CloseLogo}
        alt={'Close'}
        className={'align-top'}
      />
    </div>
  );
};
export default CloseNBackBtn;
