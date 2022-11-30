import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Marker.module.scss';
// import {
//   hideRightBlock,
//   showRightBlock,
//   setEnterprise,
//   selectRightBlockIsHide,
// } from '../../redux/slices/descriptionBlockSlice';
import {
  selectCurrentEnterprise,
  setCurrent,
} from '../../redux/slices/currentSlice';
import { useAppDispatch } from '../../redux/store';

type Position = {
  top: number;
  left: number;
};

type MarkerProps = {
  value: string;
  position: Position;
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  id: number;
};

const Marker: React.FC<MarkerProps> = ({ value, position, corner, id }) => {
  const [width, setWidth] = useState<number>(0);
  const markerLabel = useRef<HTMLParagraphElement>(null);
  const dispatch = useAppDispatch();
  // const isClosed = useSelector(selectRightBlockIsHide);
  //
  // function handleClick(id: number) {
  //   dispatch(hideRightBlock());
  //   setTimeout(() => {
  //     dispatch(setEnterprise());
  //     dispatch(setCurrent({ current: id }));
  //     dispatch(showRightBlock());
  //   }, 1500);
  // }

  const currentId = useSelector(selectCurrentEnterprise);

  useEffect(() => {
    if (width === 0) {
      setWidth(markerLabel?.current?.clientWidth || 0);
    }
  }, [width]);

  const labelParams = {
    ['top-left']: {
      containerStyle: (position: Position) => ({
        top: `calc(${position.top}% - 16px)`,
        left: `${position.left}%`,
      }),
      labelStyle: {
        borderBottomLeftRadius: '0',
      },
      pointer: styles.markersBlock_topLeftCorner,
    },
    ['top-right']: {
      containerStyle: (position: Position) => ({
        top: `calc(${position.top}% - 16px)`,
        left: `calc(${position.left}% - ${width}px)`,
      }),
      labelStyle: {
        borderBottomRightRadius: '0',
      },
      pointer: styles.markersBlock_topRightCorner,
    },
    ['bottom-left']: {
      containerStyle: (position: Position) => ({
        top: `calc(${position.top}% - 16px)`,
        left: `${position.left}%`,
      }),
      labelStyle: {
        borderTopLeftRadius: '0',
      },
      pointer: styles.markersBlock_bottomLeftCorner,
    },
    ['bottom-right']: {
      containerStyle: (position: Position) => ({
        top: `calc(${position.top}% - 16px)`,
        left: `calc(${position.left}% - ${width}px)`,
      }),
      labelStyle: {
        borderTopRightRadius: '0',
      },
      pointer: styles.markersBlock_bottomRightCorner,
    },
  };
  return (
    <div
      className={`position-absolute ${styles.markersBlock_marker} ${
        id === currentId && styles.markersBlock_marker__checked
      }`}
      style={
        labelParams[corner]?.containerStyle(position) ||
        labelParams['bottom-right'].containerStyle(position)
      }
      // onClick={() => !isClosed && id !== currentId && handleClick(id)}
    >
      <p
        className={`text-dark fw-bold ${styles.markersBlock_label}`}
        style={labelParams[corner].labelStyle}
        ref={markerLabel}
      >
        {value}
      </p>
      {/*<img*/}
      {/*  src={labelParams[corner].imgSrc}*/}
      {/*  alt={'Маркер'}*/}
      {/*  className={labelParams[corner].imgClassName}*/}
      {/*/>*/}
      <svg
        className={labelParams[corner].pointer}
        width='175'
        height='36'
        viewBox='0 0 175 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 2H152L165 31.5' stroke='#FFC40B' strokeWidth='3' />
        <circle cx='165' cy='31' r='5' fill='white' />
      </svg>
    </div>
  );
};

export default Marker;
