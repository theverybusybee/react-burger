import loginStyles from "./login-page.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className={loginStyles.authContainer}>
      <h1 className={`${loginStyles.title} title text text_type_main-medium`}>
        Вход
      </h1>
      <form className={loginStyles.authForm}>
        <Input name={"email"} icon="undefined" placeholder="E-mail" />

        <PasswordInput name={"password"} />

        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p
        className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        Вы — новый пользователь?{" "}
        <Link className={loginStyles.link}>Зарегистрироваться</Link>
      </p>
      <p
        className={`${loginStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?{" "}
        <Link className={loginStyles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;
