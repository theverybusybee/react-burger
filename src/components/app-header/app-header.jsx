import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyle from "./app-header.module.css";
import { NavLink, Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={AppHeaderStyle.main}>
      <ul className={AppHeaderStyle.navbar}>
        <ul className={AppHeaderStyle.navbarItemContainer}>
          <li
            className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}
          >
            <BurgerIcon type="primary" />
            <NavLink className={AppHeaderStyle.link} activeClassName={AppHeaderStyle.selected} to='/'> 
              Конструктор
            </NavLink>
          </li>

          <li
            className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}
          >
            <ListIcon type="secondary" />
            <a className={AppHeaderStyle.link} href="index.html">
              Лента заказов
            </a>
          </li>
        </ul>

        <li
          className={`${AppHeaderStyle.navbarItem} ${AppHeaderStyle.navbarItem_type_logo}`}
        >
          <Link to='/' className={AppHeaderStyle.link} href="index.html">
            <Logo />
          </Link>
        </li>

        <li
          className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}
        >
          <ProfileIcon type="secondary" />
          <NavLink className={AppHeaderStyle.link} activeClassName={AppHeaderStyle.selected} to='/profile'>
            Личный кабинет
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
