import React, { useEffect, useRef, useState } from 'react';
import styles from './OOPTItem.module.scss';
import Carousel from 'nuka-carousel';
import imgLeft from './left.png';
import { useAppDispatch } from '../../redux/store';
import { setImages } from '../../redux/slices/fullScreenImageSlice';
import { IPhoto } from '../../common/types';

type Props = {
  children: React.ReactNode;
  title: string;
  photos: IPhoto[] | undefined;
  disableFader?: boolean;
};

const OOPTItem: React.FC<Props> = ({
  children,
  title,
  photos,
  disableFader,
}) => {
  const dispatch = useAppDispatch();

  const textInnerRef = useRef<HTMLDivElement>(null);
  const [isFaded, setIsFaded] = useState(true);

  const onScroll = () => {
    if (textInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = textInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setIsFaded(false);
      } else {
        setIsFaded(true);
      }
    }
  };

  useEffect(() => {
    if (textInnerRef.current) {
      const { scrollHeight, clientHeight } = textInnerRef.current;
      if (scrollHeight === clientHeight) {
        setIsFaded(false);
      }
    }
  }, []);

  return (
    <div className={'text-black'}>
      <p className={styles.h1}>{title}</p>

      <div className={'position-relative'}>
        <div
          className={`${styles.text} ${
            !photos || photos.length === 0
              ? styles.text__long
              : styles.text__short
          } add-scrollbar`}
          onScroll={onScroll}
          ref={textInnerRef}
        >
          {children}
        </div>
        <div
          className={`${styles.fader} ${
            isFaded ? styles.fader__hide : styles.fader__show
          } ${disableFader && 'd-none'}`}
        />
      </div>

      <div className={`align-self-center ${styles.carousel}`}>
        {photos && photos.length > 0 && photos.length > 4 ? (
          <Carousel
            className={`mt-2`}
            renderBottomCenterControls={null}
            renderCenterLeftControls={({ previousSlide }) => (
              <img
                src={imgLeft}
                alt={'Previous slide'}
                onClick={previousSlide}
                className={styles.carousel_toLeft}
              />
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <img
                src={imgLeft}
                alt={'Next slide'}
                onClick={nextSlide}
                className={styles.carousel_toRight}
              />
            )}
            wrapAround={true}
            slidesToShow={4}
          >
            {photos.map(
              (
                {
                  id,
                  small,
                  alt,
                }: {
                  id: number;
                  small?: string;
                  alt?: string;
                },
                index
              ) => (
                <img
                  src={`${
                    process.env.REACT_APP_API_URL_STATIC ||
                    'http://localhost:4000/'
                  }${small}`}
                  alt={alt}
                  key={id}
                  width={'300px'}
                  onClick={() =>
                    dispatch(
                      setImages({
                        images: photos,
                        currentImage: index,
                      })
                    )
                  }
                  className={'btn border-0 shadow-none p-0'}
                />
              )
            )}
          </Carousel>
        ) : (
          photos &&
          photos.map(
            (
              {
                id,
                small,
                alt,
              }: {
                id: number;
                small?: string;
                alt?: string;
              },
              index
            ) => (
              <img
                src={`${
                  process.env.REACT_APP_API_URL_STATIC ||
                  'http://localhost:4000/'
                }${small}`}
                alt={alt}
                key={id}
                width={'300px'}
                onClick={() =>
                  dispatch(
                    setImages({
                      images: photos,
                      currentImage: index,
                    })
                  )
                }
                className={'btn border-0 shadow-none p-0 me-2'}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default OOPTItem;
