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
            <NavLink
              className={AppHeaderStyle.link}
              activeClassName={AppHeaderStyle.selected}
              to="/"
              exact={true}
            >
              Конструктор
            </NavLink>
          </li>

          <li
            className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}
          >
            <ListIcon type="secondary" />
            <NavLink className={AppHeaderStyle.link} activeClassName={AppHeaderStyle.selected} to="/feed" exact={true}>
              Лента заказов
            </NavLink>
          </li>
        </ul>

        <li
          className={`${AppHeaderStyle.navbarItem} ${AppHeaderStyle.navbarItem_type_logo}`}
        >
          <Link to="/" className={AppHeaderStyle.link}>
            <Logo />
          </Link>
        </li>

        <li
          className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}
        >
          <ProfileIcon type="secondary" />
          <NavLink
            className={AppHeaderStyle.link}
            activeClassName={AppHeaderStyle.selected}
            to="/profile"
            exact={true}
          >
            Личный кабинет
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
