import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import registerStyles from "./register-page.module.css";

function RegisterPage() {
  return (
    <div className={registerStyles.authContainer}>
      <h1
        className={`${registerStyles.title} title text text_type_main-medium`}
      >
        Регистрация
      </h1>
      <form className={registerStyles.authForm}>
        <label>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          ></Input>
        </label>

        <label>
          <EmailInput name={"email"} />
        </label>

        <label>
          <PasswordInput name={"password"} />
        </label>

        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.alreadyRegister} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?{" "}
        <Link className={registerStyles.loginLink}>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
