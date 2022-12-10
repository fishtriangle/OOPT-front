import React, { useState } from 'react';
import styles from './MainMenu.module.scss';
import bistrinskiyLogo from './logo-bistrinskiy-yellow.png';
import arrow from './arrow.png';
import { Nav } from 'react-bootstrap';
import { useAppDispatch } from '../../redux/store';
import {
  hideBlock,
  selectDescriptionBlockIsHide,
  selectType,
  setBlockType,
  showBlock,
} from '../../redux/slices/descriptionBlockSlice';
import { useSelector } from 'react-redux';
import { EnumDescriptionBlock } from '../../common/types';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Информация о парке', id: EnumDescriptionBlock.ABOUT },
  { title: 'Маршруты', id: EnumDescriptionBlock.TRACKS },
  { title: 'Достопримечательности', id: EnumDescriptionBlock.POINTS },
  { title: 'Населённые пункты', id: EnumDescriptionBlock.TOWNS },
  { title: 'Мастера традиционных ремёсел', id: EnumDescriptionBlock.MASTERS },
  { title: 'Туристический сервис', id: EnumDescriptionBlock.SERVICE },
  { title: 'Национальные праздники', id: EnumDescriptionBlock.HOLIDAYS },
];

const MainMenu: React.FC = () => {
  const [isHide, setIsHide] = useState(false);
  const dispatch = useAppDispatch();
  const isDescriptionHide = useSelector(selectDescriptionBlockIsHide);
  const currentActiveBlock = useSelector(selectType);
  const navigate = useNavigate();

  function handleHideClick() {
    setIsHide(!isHide);
  }

  function handleSelect(selectedKey: string | null) {
    if (!isDescriptionHide) {
      dispatch(hideBlock());
      setTimeout(() => {
        // dispatch(setCurrent({ current: null }));
        dispatch(setBlockType(selectedKey));
        dispatch(showBlock());
      }, 1000);
    } else {
      dispatch(setBlockType(selectedKey));
      dispatch(showBlock());
    }
  }

  return (
    <div className={`${styles.container} ${isHide && styles.container__hide}`}>
      <div
        className={
          'd-flex flex-nowrap align-items-center justify-content-between'
        }
      >
        <img
          src={bistrinskiyLogo}
          alt={'Логотип парк Быстринский'}
          className={'me-2'}
          onClick={() => navigate('/admin')}
        />
        <Nav
          activeKey={undefined}
          onSelect={(selectedKey) => handleSelect(selectedKey)}
          className={
            'd-flex justify-content-end w-62 flex-wrap align-items-center'
          }
        >
          {menuItems.map(({ title, id }, index) => (
            <Nav.Item key={id}>
              <Nav.Link
                eventKey={id}
                className={`${styles.nav} ${
                  id === currentActiveBlock && styles.nav__chosen
                } ${isDescriptionHide === true && styles.nav__unChosen}`}
              >
                {title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <img
        src={arrow}
        alt={'Скрыть меню'}
        className={`${styles.hideBtn} ${isHide && styles.hideBtn__pressed}`}
        onClick={handleHideClick}
      />
    </div>
  );
};
export default MainMenu;
