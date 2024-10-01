import s from './galleryList.module.scss'
import m from './../../assets/styles/main.module.scss'
import classNames from 'classnames';
import GalleryItem from '../GalleryItem/GalleryItem';
import { useAppSelector } from '../../hooks/redux';

const GalleryList = () => {
  const { paintings, isLoading, error} = useAppSelector((state) => state.paintings);
  const { searchStatus } = useAppSelector((state) => state.search);
  const { theme } = useAppSelector((state) => state.theme);

  if (searchStatus[0]?.status === "empty") {
    return (
      <div className={classNames(m.container, s.search__box)}>
        <div className={classNames(s.search__empty, theme === 'light' && m.light__dark_gray__color)}>No matches for <span className={s.search__result}>{searchStatus[0].result}</span></div>
        <div className={s.search__error}>Please try again with a different spelling or keywords.</div>
      </div>
    );
  }

  return (
    <section className={s.gallery}>
      <div className={classNames(m.container, s.wrapper)}>
        <div className={s.gallery__list}>
          {
            !isLoading && paintings?.map((painting) => {
              return (
                <GalleryItem
                key={painting.id}
                authorId={painting.authorId}
                created={painting.created}
                id={painting.id}
                imageUrl={painting.imageUrl}
                locationId={painting.locationId}
                name={painting.name}
              />
              )
            })
          }
            
          {error && <h1>Ошибочка</h1>}
        </div>
      </div>
    </section>
  )
}

export default GalleryList