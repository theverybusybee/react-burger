import forgotPasswordStyles from "./forgot-password-page.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchForgotPassword } from "../../utils/fetchOrderData";

function ForgotPasswordPage() {
  const [apiState, setApiState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  function getMail(mail) {
    return function () {
      setApiState({ ...apiState, isLoading: true });
      fetchForgotPassword(mail)
        .then((res) => {
          if (res && res.success) {
            setApiState({ ...apiState, data: res.message });
            console.log(res);
          } else {
            setApiState({ ...apiState, hasError: true });
          }
        })
        .catch(() => setApiState({ ...apiState, hasError: true }));
    };
  }

  const [mailState, setMailState] = useState({
    email: "",
  });

  const onInputChange = (e) => {
    const target = e.target;
    setMailState({ ...mailState, [target.type]: target.value });
  };

  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} action="">
        <h1
          className={`${forgotPasswordStyles.title} text text_type_main-medium`}
        >
          Восстановление пароля
        </h1>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          disabled={false}
          onChange={onInputChange}
        />
        <Button type="primary" size="medium" onClick={getMail(mailState)}>
          Восстановить
        </Button>
      </form>
      <p
        className={`${forgotPasswordStyles.recallPassword} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link to='/login' className={forgotPasswordStyles.loginLink}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
