import React from 'react';
import { useQuery } from '@apollo/client';
import { IGetTrack, IGetTrackVars } from '../../common/types';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import { GET_TRACK } from '../../graphql/query/track';
import { useSelector } from 'react-redux';
import { selectCurrentTrackId } from '../../redux/slices/descriptionBlockSlice';
import OOPTItem from '../OOPTItem/OOPTItem';
import pointImg from './point.png';
import calendarImg from './calendar.png';
import baggageImg from './baggage.png';
import distanceImg from './distance.png';
import houseImg from './house.png';
import timerImg from './timer.png';
import { TrackIcons } from '../TrackIcons/TrackIcons';

export const Track: React.FC = () => {
  const trackId = useSelector(selectCurrentTrackId);

  const { data, loading, error } = useQuery<IGetTrack, IGetTrackVars>(
    GET_TRACK,
    {
      variables: {
        pollInterval: 3000,
        trackUniqueInput: { id: trackId },
      },
    }
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <p className={'text-center'}>
          Ошибка загрузки информации о Маршруте...
        </p>
        <p>{error.message}</p>
      </>
    );

  const photos = data?.getTrack.photos;

  return (
    <OOPTItem title={data?.getTrack.title || ''} photos={photos}>
      <Text>{data?.getTrack.description}</Text>
      <div className={'row'}>
        <div className={'col-5'}>
          <div className={'d-flex flex-column mt-3'}>
            <img src={pointImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>Тип маршрута</p>
            <p className={'m-0'}>{data?.getTrack.type}</p>
          </div>
          <div className={'d-flex flex-column mt-3'}>
            <img src={distanceImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>Протяженность</p>
            <p className={'m-0'}>{data?.getTrack.length}</p>
          </div>
          <div className={'d-flex flex-column mt-3'}>
            <div>
              <TrackIcons
                trackTransport={data?.getTrack.transport || ''}
                iconsSize={60}
              />
            </div>
            <p className={'fw-bold m-0'}>Способ передвижения</p>
            <p className={'m-0'}>{data?.getTrack.transport}</p>
          </div>
          <div className={'d-flex flex-column mt-3'}>
            <img src={timerImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>
              Предполагаемое время прохождения маршрута
            </p>
            <p className={'m-0'}>{data?.getTrack.length}</p>
          </div>
        </div>
        <div className={'col-1'} />
        <div className={'col-5 '}>
          <div className={'d-flex flex-column mt-3'}>
            <img src={calendarImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>Сезонность</p>
            <p className={'m-0'}>{data?.getTrack.season}</p>
          </div>
          <div className={'d-flex flex-column mt-3'}>
            <img src={baggageImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>Источники питьевой воды</p>
            <p className={'m-0'}>{data?.getTrack.water}</p>
          </div>
          <div className={'d-flex flex-column mt-3'}>
            <img src={houseImg} alt={''} width={60} height={60} />
            <p className={'fw-bold m-0'}>Места стоянок</p>
            <p className={'m-0'}>
              {data && data.getTrack.stops.length > 0
                ? data?.getTrack.stops.map(({ title }) => title).join(', ')
                : 'отсутствуют'}
            </p>
          </div>
        </div>
      </div>
    </OOPTItem>
  );
};
