import { FC, MouseEvent, TouchEvent, useState } from 'react'
import s from './galleryItem.module.scss'
import m from './../../assets/styles/main.module.scss'
import { IPainting } from '../../types/painting'
import { useFetchAuthorByIdQuery, useFetchLocationByIdQuery } from '../../redux/services/PaintingsService';
import { useAppSelector } from '../../hooks/redux';
import classNames from 'classnames';
import { BASE_URL } from '../../constants/baseConstants';

interface IHoveredInfo {
  author: number | null,
  location: number | null
}

const GalleryItem: FC<IPainting> = ({ authorId, created, imageUrl, locationId, name }) => {
  const [hoveredId, setHoveredId] = useState<IHoveredInfo[]>([{
    author: null,
    location: null
  }]);
  const { theme } = useAppSelector((state) => state.theme);

  // Логика наведения на картину
  const handleMouseOver = (event: MouseEvent<HTMLDivElement> | TouchEvent) => {
    const locationId = parseInt((event.target as HTMLDivElement).dataset?.locationId || '0', 10);
    const authorId = parseInt((event.target as HTMLDivElement).dataset?.authorId || '0', 10);

    setHoveredId([{ location: locationId, author: authorId }]);
  };

  const handleMouseOut = () => {
    setHoveredId([{ location: null, author: null }]);
  };

  // Получение state из RTK query
  const { data: author, isLoading: authorLoading, error: authorError } = useFetchAuthorByIdQuery(Number(hoveredId[0]?.author));
  const { data: location, isLoading: locationLoading, error: locationError } = useFetchLocationByIdQuery(Number(hoveredId[0]?.location));

  return (
    <div
      className={s.item}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleMouseOver}
      onTouchEnd={handleMouseOut}
    >
      <img className={s.image} data-location-id={locationId} data-author-id={authorId} src={BASE_URL + imageUrl} />
      <div className={classNames(s.description, theme === 'light' && m.light__background)}>
        <div className={classNames(s.description__box, theme === 'light' && m.light__red__border_left)}>
          <div className={classNames(s.description__box__name, theme === 'light' && m.light__black__color)}>{name}</div>
          <small className={classNames(s.description__box__created, theme === 'light' && m.light__red__color)}>{created}</small>
        </div>
      </div>
      {location?.length !== 0 && author?.length !== 0 && (
        <div className={classNames(s.active__painting, theme === 'light' && m.light__secondary__background)}>
          <div className={classNames(s.active__painting__title, theme === 'light' && m.light__red__color)}>Author:</div>
          <div className={classNames(s.active__painting__name, theme === 'light' && m.light__black__color)}>{!authorError && !authorLoading ? author && author[0].name : "I couldn't find the author."}</div>
          <div className={classNames(s.active__painting__title, theme === 'light' && m.light__red__color)}>Location:</div>
          <div className={classNames(s.active__painting__location, theme === 'light' && m.light__black__color)}>{!locationError && !locationLoading ? location && location[0].location : "I couldn't find the author."}</div>
        </div>
      )}
    </div>
  )
}

export default GalleryItem