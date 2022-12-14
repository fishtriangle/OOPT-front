import React from 'react';
import MainMenu from '../../components/MainMenu/MainMenu';
import DescriptionBlock from '../../components/DescriptionBlock/DescriptionBlock';
import Map from '../../components/Map/Map';
import { useSelector } from 'react-redux';
import { selectImage } from '../../redux/slices/fullScreenImageSlice';
import ImageShow from '../../components/ImageShow/ImageShow';
import { Legend } from '../../components/Legend/Legend';

const Bistrinskiy: React.FC = () => {
  const { images } = useSelector(selectImage);
  return (
    <>
      <Map />
      <MainMenu />
      <DescriptionBlock />
      <Legend />
      {images && <ImageShow />}
    </>
  );
};
export default Bistrinskiy;
