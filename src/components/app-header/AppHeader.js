import { Component } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeaderStyle from "./AppHeader.module.css";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={AppHeaderStyle.main}>
        <ul className={AppHeaderStyle.navbar}>

          <ul className={AppHeaderStyle.navbarItemContainer}>
            <li className={`${AppHeaderStyle.navbarItem} text text_type_main-default`}>
              <BurgerIcon type="primary" />
              <a className={AppHeaderStyle.link} href="#">
                Конструктор
              </a>
            </li>

            <li className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}>
              <ListIcon type="secondary" />
              <a className={AppHeaderStyle.link} href="#">
                Лента заказов
              </a>
            </li>
          </ul>

          <li className={AppHeaderStyle.navbarItem}>
            <a className={AppHeaderStyle.link} href="#">
              <Logo />
            </a>
          </li>

          <li className={`${AppHeaderStyle.navbarItem} text text_type_main-default text_color_inactive`}>
            <ProfileIcon type="secondary" />
            <a className={AppHeaderStyle.link} href="#">
              Личный кабинет
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
