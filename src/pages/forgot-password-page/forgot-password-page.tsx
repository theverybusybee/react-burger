import forgotPasswordStyles from "./forgot-password-page.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState, useCallback } from "react";
import { fetchForgotPassword } from "../../utils/fetches";
import { TForgotPassword } from "../../services/types/data";

function ForgotPasswordPage() {
  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const [formState, setFormState] = useState({
    email: "",
  });

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.name]: target.value });
  };

  const resetPassword = async (form: TForgotPassword) => {
    const data = await fetchForgotPassword(form).then((data) => data);
    if (data.success) {
      setApiState({ ...apiState, data: data });
    }
  };

  const push = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      resetPassword(formState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState]
  );

  if (apiState.data) {
    return <Redirect to="/reset-password" />;
  }

  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} onSubmit={push}>
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
        <Button type="primary" size="medium" htmlType='submit'>
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
