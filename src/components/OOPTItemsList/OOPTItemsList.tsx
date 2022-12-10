import React from 'react';
import {
  EnumDescriptionBlock,
  IHoliday,
  IMaster,
  IPoint,
} from '../../common/types';
import styles from './OOPTItemsList.module.scss';
import List from '../List/List';

type Props = {
  title: string;
  list: IPoint[] | IMaster[] | IHoliday[];
  listType: EnumDescriptionBlock;
  dispatchFunction: (id: number) => any;
};

const OOPTItemsList: React.FC<Props> = ({
  title,
  list,
  listType,
  dispatchFunction,
}) => {
  return (
    <div className={'text-black'}>
      <p className={styles.h1}>
        {title}
        <br />
        Природный парк «Быстринский»
      </p>

      <List
        list={list}
        listType={listType}
        dispatchFunction={dispatchFunction}
      />
    </div>
  );
};

export default OOPTItemsList;
