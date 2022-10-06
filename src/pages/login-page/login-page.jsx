import loginStyles from "./login-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState, useCallback } from "react";
import { useAuth } from "../../services/hooks/auth";

function LoginPage() {
  const auth = useAuth();

  const [form, setValue] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(form);
    },
    [auth, form]
  );

  if (auth.user) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className={loginStyles.authContainer}>
      <h1 className={`${loginStyles.title} title text text_type_main-medium`}>
        Вход
      </h1>
      <form className={loginStyles.authForm}>
        <Input
          name={"email"}
          icon="undefined"
          placeholder="E-mail"
          onChange={onChange}
        />

        <PasswordInput name={"password"} onChange={onChange} />

        <Button type="primary" size="medium" onClick={login}>
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
