import React from 'react';
import { useSelector } from 'react-redux';

import styles from './RightSlidingBlock.module.scss';
import IntroBlock from '../IntroBlock/IntroBlock';
import EnterpriseBlock from '../EnterpriseBlock/EnterpriseBlock';
import AboutBlock from '../AboutBlock/AboutBlock';
import NewsBlock from '../NewsBlock/NewsBlock';
import NewsItemBlock from '../NewsItemBlock/NewsItemBlock';

const RightSlidingBlock: React.FC = () => {
  // const isHide = useSelector(selectRightBlockIsHide);
  // const blockType = useSelector(selectType);

  const blockMap = {
    intro: <IntroBlock />,
    enterprise: <EnterpriseBlock />,
    about: <AboutBlock />,
    news: <NewsBlock />,
    newsItem: <NewsItemBlock />,
  };

  return (
    <div
    // className={`${styles.rightSlidingBlock} ${
    //   // isHide && styles.rightSlidingBlock__closed
    // }`}
    >
      {/*{blockMap[blockType] ?? null}*/}
    </div>
  );
};

export default RightSlidingBlock;
