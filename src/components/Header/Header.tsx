import m from './../../assets/styles/main.module.scss'
import s from './header.module.scss'
import Logo from './../../assets/images/logo.svg?react';
import LightThemeIcon from './../../assets/images/light_icon.svg?react';
import DarkThemeIcon from './../../assets/images/dark_icon.svg?react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { setTheme } from '../../redux/slices/theme';


const Header = () => {
  const { theme } = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(next))
  }

  return (
    <section className={s.header}>
      <div className={classNames(m.container, s.wrapper)}>
        <a href='/' className={s.logo}>
          <Logo className={classNames(s.logo__img, theme === 'light' && m.dark__fill)} width="91px" height="20px" />
        </a>

        <div className={classNames(s.theme, theme === 'light' ? m.light__secondary__background : m.dark__background)} onClick={handleChange}>
          {
            theme === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />
          }
        </div>
      </div>
    </section>
  )
}

export default Header