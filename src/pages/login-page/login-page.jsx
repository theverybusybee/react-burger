import loginStyles from "./login-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../services/actions/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authUserReducer.isLogin);
  const location = useLocation();

  const [form, setValue] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(authenticateUser(form));
    },
    [dispatch, form]
  );

  if (isLogin) {
    return (
      <Redirect
        to={{
          pathname: "/",
          from: location,
        }}
      />
    );
  }

  return (
    <div className={loginStyles.authContainer}>
      <h1 className={`${loginStyles.title} title text text_type_main-medium`}>
        Вход
      </h1>
      <form className={loginStyles.authForm} onSubmit={login}>
        <Input
          value={form.email}
          name={"email"}
          icon="undefined"
          placeholder="E-mail"
          onChange={onChange}
        />

        <PasswordInput
          value={form.password}
          name={"password"}
          onChange={onChange}
        />

        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p
        className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        Вы — новый пользователь?{" "}
        <Link className={loginStyles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?{" "}
        <Link className={loginStyles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
