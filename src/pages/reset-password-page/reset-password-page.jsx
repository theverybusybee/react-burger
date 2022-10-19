import resetStyles from "./reset-password-page.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { fetchResetPassword } from "../../utils/fetchOrderData";
import { useState } from "react";

function ResetPasswordPage() {
  const [formState, setFormState] = useState({
    password: "",
    token: "",
  });
  const history = useHistory();

  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const resetPassword = async (form) => {
    const data = await fetchResetPassword(form).then((data) => data);
    if (data.success) {
      setApiState({ ...apiState, data: data });
    }
  };

  const submitResetPassword = (e) => {
    e.preventDefault();
    resetPassword(formState);
    history.push("/login");
  };

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className={resetStyles.container}>
      <form className={resetStyles.form} action="">
        <h1 className={`${resetStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <Input
          value={formState.password}
          name="password"
          type="password"
          placeholder="Введите новый пароль"
          disabled={false}
          icon="ShowIcon"
          onChange={onInputChange}
        />
        <Input
          value={formState.token}
          name="token"
          type="text"
          placeholder="Введите код из письма"
          disabled={false}
          onChange={onInputChange}
        />
        <Button type="primary" size="medium" onClick={submitResetPassword}>
          Сохранить
        </Button>
      </form>
      <p
        className={`${resetStyles.recallPassword} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link className={resetStyles.loginLink} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
