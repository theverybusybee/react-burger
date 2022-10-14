import ProfileStyles from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getData, logoutFromAccount, updateData } from "../../services/actions/auth";
import { useCallback, useState } from "react";
import { deleteCookie } from '../../utils/cookie'

function Profile() {
  const dispatch = useDispatch();
  const { refreshToken, userInfo, isLogin } = useSelector(
    (state) => state.authUserReducer
  );

  console.log(isLogin)
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const logoutUser = (form) => {
    dispatch(logoutFromAccount(form));
  };

  const updateUser = ( form ) => {
    dispatch(updateData(form))
  }

  const updateUserData = useCallback((e) => {
    e.preventDefault();
    updateUser(form);
  }, [form])

  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form)

  const logout = useCallback(
    (e) => {
      console.log("click");
      e.preventDefault();
      logoutUser({ token: refreshToken });
      deleteCookie('token')
    },
    [refreshToken]
  );

  const resetForm = () => {
    setForm({ email: '', name:'', password:'' });
  }

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
      <div className={ProfileStyles.linksContainer}>
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
          onChange={onInputChange}
          value={form.name}
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
          onChange={onInputChange}
          value={form.email}
          type={"text"}
          placeholder={"Логин"}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
          // value={userInfo.user.email}
        ></Input>

        <Input
          value={form.password}
          onChange={onInputChange}
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
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
      {form.email || form.name || form.password ? (
        <div className={ProfileStyles.buttonsContainer}>
          <Button type="secondary" size="medium" onClick={resetForm}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={updateUserData}>
            Сохранить
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
