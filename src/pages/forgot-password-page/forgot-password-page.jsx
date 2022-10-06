import forgotPasswordStyles from "./forgot-password-page.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState, useCallback } from "react";
import { fetchForgotPassword } from "../../utils/fetchOrderData";

function ForgotPasswordPage() {
  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [formState, setFormState] = useState({
    email: "",
  });

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const resetPassword = async (form) => {
    const data = await fetchForgotPassword(form).then((data) => data);
    if (data.success) {
      setApiState({ ...apiState, data: data });
    }
  };

  let push = useCallback(
    (e) => {
      e.preventDefault();
      resetPassword(formState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState]
  );

  if (apiState.data.success) {
    return <Redirect to="/reset-password" />;
  }

  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form}>
        <h1
          className={`${forgotPasswordStyles.title} text text_type_main-medium`}
        >
          Восстановление пароля
        </h1>
        <Input
          value={formState.email}
          name="email"
          type="email"
          placeholder="Укажите e-mail"
          disabled={false}
          onChange={onInputChange}
        />
        <Button type="primary" size="medium" onClick={push}>
          Восстановить
        </Button>
      </form>
      <p
        className={`${forgotPasswordStyles.recallPassword} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link to="/login" className={forgotPasswordStyles.loginLink}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
