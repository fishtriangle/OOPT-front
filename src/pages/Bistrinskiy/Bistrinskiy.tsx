import React from 'react';
import MainMenu from '../../components/MainMenu/MainMenu';
import DescriptionBlock from '../../components/DescriptionBlock/DescriptionBlock';
import Map from '../../components/Map/Map';

const Bistrinskiy: React.FC = () => {
  return (
    <>
      <Map />
      <MainMenu />
      <DescriptionBlock />
    </>
  );
};
export default Bistrinskiy;
