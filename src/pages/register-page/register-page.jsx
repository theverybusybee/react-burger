import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import registerStyles from "./register-page.module.css";
import { useState, useCallback } from "react";
import { fetchRegister } from "../../utils/fetchOrderData";

function RegisterPage() {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const registerUser = async (form) => {
    const data = await fetchRegister(form).then((data) => data).then((data) => console.log(data))
    if (data.success) {
      setApiState({ ...apiState, data: {user: data.user, accessToken: data.accessToken} });
    }
  };

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  let push = useCallback(
    (e) => {
      e.preventDefault();
      registerUser(formState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState]
  );

  return (
    <div className={registerStyles.authContainer}>
      <h1
        className={`${registerStyles.title} title text text_type_main-medium`}
      >
        Регистрация
      </h1>
      <form className={registerStyles.authForm}>
        <Input
          value={formState.name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          onChange={onInputChange}
        ></Input>

        <Input
          value={formState.email}
          name={"email"}
          icon="undefined"
          placeholder="E-mail"
          onChange={onInputChange}
        />

        <PasswordInput
          value={formState.password}
          name={"password"}
          onChange={onInputChange}
        />

        <Button type="primary" size="medium" onClick={push}>
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.alreadyRegister} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?{" "}
        <Link className={registerStyles.loginLink} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
