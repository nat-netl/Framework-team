import { useEffect, useState } from 'react';
import classNames from 'classnames'
import s from './search.module.scss'
import m from './../../assets/styles/main.module.scss'
import SearchIcon from './../../assets/images/search_icon.svg?react';
import ClearIcon from './../../assets/images/clear_search.svg?react';
import { useFetchAllPaintingsQuery } from '../../redux/services/PaintingsService';
import { ITEMS_PER_PAGE } from '../../constants/baseConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchStatus } from '../../redux/slices/search';

const Search = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const { theme } = useAppSelector((state) => state.theme);
  const { data: paintings, refetch } = useFetchAllPaintingsQuery({ search, limit: ITEMS_PER_PAGE });
  const dispatch = useAppDispatch()

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };
  useEffect(() => {
    refetch();
    paintings?.length === 0 ? dispatch(setSearchStatus([{status: "empty", result: search}])) : dispatch(setSearchStatus([{status: "filled"}]));
  }, [search])

  return (
    <section className={s.search}>
      <div className={classNames(m.container, s.wrapper)}>
        <div className=
          {
            classNames(s.search__box,
              isActive ? theme === 'light' ? m.light__active__border : s.active : '',
              theme === 'light' && classNames(m.light__border, m.light__background)
            )
          }
        >
          <SearchIcon className={classNames(s.searchBox__searchIcon, theme === 'light' && m.dark__fill)} />
          <input className={classNames(s.searchBox__input, theme === 'light' && m.light__dark_gray__color)} placeholder='Painting title' type="text"
            value={search}
            onChange={(e) => handleInputChange(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {

            <ClearIcon className=
              {
                classNames(
                  search && m.visible,
                  classNames(s.searchBox__clearIcon, theme === 'light' && m.dark__fill)
                )
              } onClick={() => handleClearSearch()} />
          }
        </div>
      </div>
    </section>
  )
}

export default Search