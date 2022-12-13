import React from 'react';
import {
  EnumDescriptionBlock,
  IHoliday,
  IMaster,
  IPoint,
} from '../../common/types';
import styles from './List.module.scss';
import {
  hideBlock,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useAppDispatch } from '../../redux/store';
import { setCurrentLabel } from '../../redux/slices/currentLabelSlice';
import { createLayerData, createViewData } from '../Map/utilities';
import { setCurrentViewState } from '../../redux/slices/currentViewStateSlice';

type Props = {
  list: IPoint[] | IMaster[] | IHoliday[];
  listType: EnumDescriptionBlock;
  dispatchFunction?: (id: number) => any;
  onClick?: () => any;
};

const List: React.FC<Props> = ({
  list,
  listType,
  dispatchFunction,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const handleClick = (item: IPoint | IMaster | IHoliday) => {
    console.log(item);

    if ('axis' in item) {
      const iconData = createLayerData(item);
      const viewData = createViewData(item);

      iconData && dispatch(setCurrentLabel(iconData));
      dispatch(setCurrentViewState(viewData));
    }

    if (dispatchFunction) {
      dispatch(hideBlock());
      setTimeout(() => {
        if (onClick) {
          onClick();
        }
        dispatch(dispatchFunction(item.id));
        dispatch(setBlockType(listType));
        dispatch(showBlock());
      }, 1000);
    }
  };

  return (
    <div className={`${styles.listBlock}`}>
      <div className={`row ${list.length > 28 && 'add-scrollbar h-63'}`}>
        {list.map((item) => (
          <div className={'col-6 mt-3'} key={item.id}>
            <p className={styles.list} onClick={() => handleClick(item)}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
