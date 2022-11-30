import { useSelector } from 'react-redux';
import React from 'react';

import MarkersBlock from '../components/MarkersBlock/MarkersBlock';
import RightSlidingBlock from '../components/RightSlidingBlock/RightSlidingBlock';
import ImageShow from '../components/ImageShow/ImageShow';
import VacanciesBlock from '../components/VacaciesList/VacanciesBlock';
import { selectImage } from '../redux/slices/fullScreenImageSlice';
import { selectCurrentId } from '../redux/slices/vacanciesSlice';

const Home: React.FC = () => {
  // const { images } = useSelector(selectImage);
  // const currentId = useSelector(selectCurrentId);
  return (
    <>
      {/*<MarkersBlock />*/}
      {/*<RightSlidingBlock />*/}
      {/*{images && <ImageShow />}*/}
      {/*{currentId && <VacanciesBlock />}*/}
    </>
  );
};
export default Home;
