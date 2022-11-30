import React from 'react';

import styles from './ImageShow.module.scss';
import { useSelector } from 'react-redux';
import {
  resetImage,
  selectImage,
  showImage,
} from '../../redux/slices/fullScreenImageSlice';
import { useEffect } from 'react';
import Carousel from 'nuka-carousel';
import CloseBtn from '../CloseBtn/CloseBtn';
import { useAppDispatch } from '../../redux/store';

const ImageShow: React.FC = () => {
  const dispatch = useAppDispatch();

  const { images, isImageShown } = useSelector(selectImage);

  useEffect(() => {
    setTimeout(() => dispatch(showImage()), 0);
  });

  return (
    <div
      className={`w-100 h-100 position-absolute top-0 overflow-hidden d-flex justify-content-center align-items-center`}
    >
      <div
        className={`w-100 h-100 position-absolute top-0 overflow-hidden bg-black opacity-75 ${styles.ImageShow_bg}`}
        onClick={() => dispatch(resetImage())}
      />
      <div
        className={`${styles.ImageShow_img} ${
          isImageShown && styles.ImageShow_img__show
        }`}
      >
        <Carousel
          renderBottomCenterControls={null}
          renderCenterLeftControls={({ previousSlide }) => (
            <svg
              viewBox={'0 0 5 9'}
              onClick={previousSlide}
              className={`${styles.ImageShow_imgControlLeft} ${styles.ImageShow_imgControl}`}
            >
              <path d='M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z' />
            </svg>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <svg
              viewBox={'0 0 5 9'}
              onClick={nextSlide}
              className={`${styles.ImageShow_imgControlRight} ${styles.ImageShow_imgControl}`}
            >
              <path d='M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z' />
            </svg>
          )}
          wrapAround={true}
          slidesToShow={1}
        >
          {images &&
            images.map(({ large, alt }, index: number) => (
              <img
                src={large}
                alt={alt}
                key={index}
                width={'1600px'}
                className={'btn border-0 shadow-none'}
              />
            ))}
        </Carousel>
      </div>
      <CloseBtn
        closeAction={() => dispatch(resetImage())}
        classNames={`${styles.ImageShow_closeBtn}`}
      />
    </div>
  );
};

export default ImageShow;
