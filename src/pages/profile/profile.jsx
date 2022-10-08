import ProfileStyles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";

function Profile() {

  const userInfo = useSelector(state => state.authUserReducer.userInfo)
  
  return (
    <div className={ProfileStyles.container}>
      <div className={ProfileStyles.buttonsContainer}>
        <NavLink
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: '/profile' }}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: '/profile/orders' }}
        >
          История заказов
        </NavLink>
        <a
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          href='/index.html'
        >
          Выход
        </a>
      </div>

      <form className={ProfileStyles.userData}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
          // value={userInfo.user.name}
        ></Input>

        <Input
          type={"text"}
          placeholder={"Логин"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
          // value={userInfo.user.email}
        ></Input>

        <Input
          type={"password"}
          placeholder={"Пароль"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

      </form>

      <p
        className={`${ProfileStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </div>
  );
}

export default Profile;
