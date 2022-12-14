import { Route, Routes } from 'react-router-dom';

import _ from 'lodash';

import { useAppDispatch } from './redux/store';
import Intro from './pages/Intro/Intro';
import Bistrinskiy from './pages/Bistrinskiy/Bistrinskiy';
import Oopts from './pages/admin/oopts/Oopts';
import Oopt from './pages/admin/oopts/Oopt';
import Towns from './pages/admin/towns/Towns';
import Point from './pages/admin/points/Point';
import Points from './pages/admin/points/Points';
import Tracks from './pages/admin/tracks/Tracks';
import Masters from './pages/admin/masters/Masters';
import Services from './pages/admin/services/Services';
import Holidays from './pages/admin/holidays/Holidays';
import Town from './pages/admin/towns/Town';
import Photos from './pages/admin/photos/Photos';
import Track from './pages/admin/tracks/Track';
import RoutesPage from './pages/admin/routes/Routes';
import Master from './pages/admin/masters/Master';
import Service from './pages/admin/services/Service';
import Holiday from './pages/admin/holidays/Holiday';
import { useSelector } from 'react-redux';
import {
  hideBlock,
  selectDescriptionBlockIsHide,
  setBlockType,
  setCurrentTrackId,
  showBlock,
} from './redux/slices/descriptionBlockSlice';
import { setCurrentViewState } from './redux/slices/currentViewStateSlice';
import { INITIAL_VIEW_STATE } from './components/Map/variables';

function App() {
  const dispatch = useAppDispatch();
  const isDescriptionHide = useSelector(selectDescriptionBlockIsHide);
  const reset = _.debounce(() => {
    dispatch(setCurrentTrackId(0));
    dispatch(setCurrentViewState(INITIAL_VIEW_STATE));
    if (!isDescriptionHide) {
      dispatch(hideBlock());
    }
  }, 180000);

  return (
    <div className='App' onClick={() => reset()}>
      <Routes>
        <Route path={'/'} element={<Intro />} />
        <Route path={'bistrinskiy'} element={<Bistrinskiy />} />
        <Route path={'admin'} element={<Oopts />} />
        <Route path={'admin/oopts'} element={<Oopts />} />
        <Route path={'admin/oopts/:id'} element={<Oopt />} />
        <Route path={'admin/oopts/:id/photos'} element={<Photos />} />
        <Route path={'admin/oopts/:id/towns'} element={<Towns />} />
        <Route path={'admin/oopts/:id/towns/:townId'} element={<Town />} />
        <Route
          path={'admin/oopts/:id/towns/:townId/photos'}
          element={<Photos />}
        />
        <Route
          path={'admin/oopts/:id/towns/:townId/points'}
          element={<Points />}
        />
        <Route
          path={'admin/oopts/:id/towns/:townId/points/:pointId'}
          element={<Point />}
        />
        <Route
          path={'admin/oopts/:id/towns/:townId/points/:pointId/photos'}
          element={<Photos />}
        />
        <Route path={'admin/oopts/:id/points'} element={<Points />} />
        <Route path={'admin/oopts/:id/points/:pointId'} element={<Point />} />
        <Route
          path={'admin/oopts/:id/points/:pointId/photos'}
          element={<Photos />}
        />
        <Route path={'admin/oopts/:id/tracks'} element={<Tracks />} />
        <Route path={'admin/oopts/:id/tracks/:trackId'} element={<Track />} />
        <Route
          path={'admin/oopts/:id/tracks/:trackId/photos'}
          element={<Photos />}
        />
        <Route
          path={'admin/oopts/:id/tracks/:trackId/routes'}
          element={<RoutesPage />}
        />
        <Route
          path={'admin/oopts/:id/tracks/:trackId/stops'}
          element={<Points />}
        />
        <Route
          path={'admin/oopts/:id/tracks/:trackId/stops/:pointId'}
          element={<Point />}
        />
        <Route
          path={'admin/oopts/:id/tracks/:trackId/stops/:pointId/photos'}
          element={<Photos />}
        />
        <Route path={'admin/oopts/:id/masters'} element={<Masters />} />
        <Route
          path={'admin/oopts/:id/masters/:masterId'}
          element={<Master />}
        />
        <Route
          path={'admin/oopts/:id/masters/:masterId/photos'}
          element={<Photos />}
        />
        <Route path={'admin/oopts/:id/services'} element={<Services />} />
        <Route
          path={'admin/oopts/:id/services/:serviceId'}
          element={<Service />}
        />
        <Route
          path={'admin/oopts/:id/services/:serviceId/photos'}
          element={<Photos />}
        />
        <Route path={'admin/oopts/:id/holidays'} element={<Holidays />} />
        <Route
          path={'admin/oopts/:id/holidays/:holidayId'}
          element={<Holiday />}
        />
        <Route
          path={'admin/oopts/:id/holidays/:holidayId/photos'}
          element={<Photos />}
        />
      </Routes>
    </div>
  );
}

export default App;
