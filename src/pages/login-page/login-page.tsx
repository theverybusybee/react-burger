import loginStyles from "./login-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useCallback } from "react";
import { authenticateUser } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";

function LoginPage() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.authUserReducer.isLogin);
  const location = useLocation();

  const [form, setValue] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValue({ ...form, [target.name]: target.value });
  };

  const login = useCallback(
    (e: React.FormEvent) => {
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
          state: { from: location },
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
          placeholder="E-mail"
          onChange={onChange}
        />

        <PasswordInput
          value={form.password}
          name={"password"}
          onChange={onChange}
        />

        <Button type="primary" size="medium" htmlType="submit">
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
