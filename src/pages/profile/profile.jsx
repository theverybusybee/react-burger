import ProfileStyles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutFromAccount } from "../../services/actions/auth";
import { useCallback } from "react";

function Profile() {
  const dispatch = useDispatch();
  const { refreshToken, userInfo } = useSelector(
    (state) => state.authUserReducer
  );

  const logoutUser = (form) => {
    dispatch(logoutFromAccount(form));
  };

  console.log(refreshToken);

  const logout = useCallback(
    (e) => {
      console.log("click");
      e.preventDefault();
      logoutUser({ token: refreshToken });
    },
    [refreshToken]
  );

  if (!userInfo) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className={ProfileStyles.container}>
      <div className={ProfileStyles.buttonsContainer}>
        <NavLink
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile" }}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          activeClassName={ProfileStyles.selected}
          to={{ pathname: "/profile/orders" }}
        >
          История заказов
        </NavLink>
        <button
          className={`${ProfileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
          onClick={logout}
        >
          Выход
        </button>
      </div>

      <form className={ProfileStyles.userData}>
        <Input
          // value={userInfo.name}
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
          // value={userInfo.email}
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
