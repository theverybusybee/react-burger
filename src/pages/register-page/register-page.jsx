import {
  Button,
  Input,
  PasswordInput,
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
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          ></Input>

          <Input name={"email"} icon='undefined' placeholder="E-mail"/>

          <PasswordInput name={"password"} />

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
