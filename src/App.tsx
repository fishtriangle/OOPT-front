import { Route, Routes } from 'react-router-dom';

import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import Home from './pages/Home';
import Edit from './pages/Edit';
import BackgroundMusic from './components/BackgroundMusic/BackgroundMusic';
import _ from 'lodash';
// import {
//   hideRightBlock,
//   setIntro,
//   showRightBlock,
// } from './redux/slices/descriptionBlockSlice';
import { resetImage } from './redux/slices/fullScreenImageSlice';
import { resetVacancies } from './redux/slices/vacanciesSlice';
import { setCurrent } from './redux/slices/currentSlice';
import Enterprise from './pages/EnterpriseEdit/Enterprise';
import News from './pages/NewsEdit/News';
import CreateNews from './pages/NewsEdit/CreateNews';
import EditNews from './pages/NewsEdit/EditNews';
import EditEnterprisePhoto from './pages/EnterpriseEdit/EditEnterprisePhoto';
import EditEnterpriseVacancies from './pages/EnterpriseEdit/EditEnterpriseVacancies';
import EditEnterpriseDescription from './pages/EnterpriseEdit/EditEnterpriseDescription';
import { useAppDispatch } from './redux/store';
import Intro from './pages/Intro/Intro';
import Bistrinskiy from './pages/Bistrinskiy/Bistrinskiy';
import Oopts from './pages/admin/oopts/Oopts';
import Oopt from './pages/admin/oopts/Oopt';
import Towns from './pages/admin/towns/Towns';
import Point from './components/Point/Point';
import Points from './pages/admin/points/Points';
import Tracks from './pages/admin/tracks/Tracks';
import Masters from './pages/admin/masters/Masters';
import Services from './pages/admin/services/Services';
import Holidays from './pages/admin/holidays/Holidays';

function App() {
  // const dispatch = useAppDispatch();
  // const reset = _.debounce(() => {
  //   dispatch(hideRightBlock());
  //   setTimeout(() => {
  //     dispatch(setCurrent({ current: null }));
  //     dispatch(setIntro());
  //     dispatch(showRightBlock());
  //   }, 2500);
  //
  //   dispatch(resetImage());
  //
  //   dispatch(resetVacancies());
  // }, 180000);

  return (
    <div className='App' /*onClick={() => reset()}*/>
      {/*<BackgroundVideo />*/}
      <Routes>
        <Route path={'/'} element={<Intro />} />
        <Route path={'bistrinskiy'} element={<Bistrinskiy />} />
        <Route path={'admin'} element={<Oopts />} />
        <Route path={'admin/oopts/:id'} element={<Oopt />} />
        <Route path={'admin/oopts/:id/towns'} element={<Towns />} />
        <Route
          path={'admin/oopts/:id/towns/:townId/points'}
          element={<Points />}
        />
        <Route path={'admin/oopts/:id/points'} element={<Points />} />
        <Route path={'admin/oopts/:id/tracks'} element={<Tracks />} />
        <Route path={'admin/oopts/:id/masters'} element={<Masters />} />
        <Route path={'admin/oopts/:id/services'} element={<Services />} />
        <Route path={'admin/oopts/:id/holidays'} element={<Holidays />} />
        {/*  http://localhost:3000/admin/oopts/2/services*/}
        {/*    path={'enterprise/:id/photo'}*/}
        {/*    element={<EditEnterprisePhoto />}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path={'enterprise/:id/vacancies'}*/}
        {/*    element={<EditEnterpriseVacancies />}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path={'enterprise/:id'}*/}
        {/*    element={<EditEnterpriseDescription />}*/}
        {/*  />*/}
        {/*  <Route path={'enterprise'} element={<Enterprise />} />*/}
        {/*</Route>*/}
      </Routes>
      {/*<BackgroundMusic />*/}
    </div>
  );
}

export default App;
