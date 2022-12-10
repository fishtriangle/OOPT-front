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
  const handleClick = (id: number) => {
    if (dispatchFunction) {
      dispatch(hideBlock());
      setTimeout(() => {
        if (onClick) {
          onClick();
        }
        dispatch(dispatchFunction(id));
        dispatch(setBlockType(listType));
        dispatch(showBlock());
      }, 1000);
    }
  };

  return (
    <div className={`${styles.listBlock}`}>
      <div className={`row ${list.length > 28 && 'add-scrollbar h-63'}`}>
        {list.map(({ id, title }) => (
          <div className={'col-6 mt-3'} key={id}>
            <p className={styles.list} onClick={() => handleClick(id)}>
              {title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
