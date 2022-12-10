import React from 'react';
import byFootImg from './byFoot.png';
import byHorseImg from './byHorse.png';
import byCarImg from './byCar.png';
import byBicicleImg from './byBycicle.png';
import byQuadroImg from './byQuadro.png';
import bySnowRiderImg from './bySnowrider.png';

interface ITrackIconsProps {
  trackTransport: string;
  iconsSize?: number;
}

enum EnumTransport {
  FOOT = 'пешк',
  HORSE = 'лошад',
  CAR = 'авто',
  BICECLE = 'велос',
  QUADRO = 'квадроц',
  SNOWRIDER = 'снегох',
}

type TransportType =
  | EnumTransport.FOOT
  | EnumTransport.HORSE
  | EnumTransport.CAR
  | EnumTransport.BICECLE
  | EnumTransport.QUADRO
  | EnumTransport.SNOWRIDER;

const parseArray: TransportType[] = [
  EnumTransport.FOOT,
  EnumTransport.HORSE,
  EnumTransport.CAR,
  EnumTransport.BICECLE,
  EnumTransport.QUADRO,
  EnumTransport.SNOWRIDER,
];

const parsePattern = {
  [EnumTransport.FOOT]: byFootImg,
  [EnumTransport.HORSE]: byHorseImg,
  [EnumTransport.CAR]: byCarImg,
  [EnumTransport.BICECLE]: byBicicleImg,
  [EnumTransport.QUADRO]: byQuadroImg,
  [EnumTransport.SNOWRIDER]: bySnowRiderImg,
};

export const TrackIcons: React.FC<ITrackIconsProps> = ({
  trackTransport,
  iconsSize,
}) => {
  const icons = parseArray
    .filter((pattern) => trackTransport.includes(pattern))
    .map((pattern) => parsePattern[pattern]);
  return (
    <>
      {icons.map((icon, index) => (
        <img
          src={icon}
          key={index}
          alt={''}
          height={iconsSize || 44}
          width={iconsSize || 44}
        />
      ))}
    </>
  );
};
