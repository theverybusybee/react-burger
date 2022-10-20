import ProfileStyles from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutFromAccount, updateData } from "../../services/actions/auth";
import { useCallback, useState } from "react";
import { deleteCookie } from "../../utils/cookie";
import { useEffect } from "react";
import { getData } from "../../services/actions/auth";
import ProfileOrders from "../profile-orders/profile-orders";
import { data2 } from "../../utils/constants";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUserName = useSelector(
    (state) => state.authUserReducer.userInfo.name
  );
  const currentUserEmail = useSelector(
    (state) => state.authUserReducer.userInfo.email
  );

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getData());
    setForm({ ...form, email: currentUserEmail, name: currentUserName });
  }, [currentUserEmail, currentUserName]);

  const updateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateData(form.name, form.email));
    },
    [form]
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const logout = useCallback((e) => {
    e.preventDefault();
    dispatch(logoutFromAccount());
    deleteCookie("token");
    localStorage.removeItem("refreshToken");
    history.push("/login");
  }, []);

  const resetForm = () => {
    setForm({ email: "", name: "", password: "" });
  };

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
      {/* <ProfileOrders data={data2}/> */}
    </div>
  );
}

export default Profile;
