import { useEffect, useState } from 'react'
import s from './pagination.module.scss'
import m from './../../assets/styles/main.module.scss'
import ArrowPrevIcon from './../../assets/images/arrow_prev.svg?react';
import ArrowNextIcon from './../../assets/images/arrow_next.svg?react';
import classNames from 'classnames';
import { useFetchAllPaintingsQuery, useFetchPaintingsQuery } from '../../redux/services/PaintingsService';
import { ITEMS_PER_PAGE } from '../../constants/baseConstants';
import { useAppSelector } from '../../hooks/redux';


const Pagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { refetch } = useFetchAllPaintingsQuery({ page: currentPage, limit: ITEMS_PER_PAGE });
  const { data: paintings, error } = useFetchPaintingsQuery({});
  const { theme } = useAppSelector((state) => state.theme);
  const { searchStatus } = useAppSelector((state) => state.search);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  const totalPages = Math.ceil((paintings?.length || 0) / ITEMS_PER_PAGE);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const maxVisiblePages = 10;
  const startPage = Math.max(3, currentPage - totalPages);
  const endPage = Math.min(totalPages, currentPage + maxVisiblePages);

  if (error) {
    return <h2>Error fetching</h2>
  }

  if (searchStatus[0]?.status === "empty") {
    return "";
  }

  return (
    <div className={s.pagination}>
      <div className={classNames(m.container, s.wrapper)}>
        <div className={s.pagination__box}>
          <button
            className={classNames(s.button__arrow, theme === 'light' && classNames(m.dark__fill, m.light__background_gray__hover))}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ArrowPrevIcon
              className={s.arrow}
              width="7.6px"
              height="11.8px"
            />
          </button>
          <div className={s.pagination__list}>
            {totalPages >= 2 && pageNumbers.slice(0, startPage - endPage).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage
                  ? theme === "light" ? classNames(s.pagination__list__item, s.active, m.light__secondary_gray__background, m.light__dark_gray__color)
                    : classNames(s.pagination__list__item, s.active)
                  : theme === "light" ?  classNames(s.pagination__list__item, m.light__dark_gray__color, m.light__border__hover) : s.pagination__list__item
                }
              >
                {pageNumber}
              </button>
            ))}

            {totalPages > 4 && <span className={theme === "light" ? classNames(s.pagination__list__dot, m.light__dark_gray__color) : s.pagination__list__dots}>...</span>}

            {pageNumbers.slice(endPage - 1, endPage).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage
                  ? theme === "light" ? classNames(s.pagination__list__item, s.active, m.light__secondary_gray__background, m.light__dark_gray__color)
                    : classNames(s.pagination__list__item, s.active)
                  : theme === "light" ?  classNames(s.pagination__list__item, m.light__dark_gray__color, m.light__border__hover) : s.pagination__list__item
                }
              >
                {pageNumber}
              </button>
            ))}
            {endPage < totalPages && (
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            )}
          </div>
          <button
            className={classNames(s.button__arrow, theme === 'light' && classNames(m.dark__fill, m.light__background_gray__hover))}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowNextIcon
              className={s.arrow}
              width="7.6px"
              height="11.8px"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination