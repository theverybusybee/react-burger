import forgotPasswordStyles from './forgot-password-page.module.css';
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className={forgotPasswordStyles.container}>
      <form className={forgotPasswordStyles.form} action="">
        <h1 className={`${forgotPasswordStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          disabled={false}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p
        className={`${forgotPasswordStyles.recallPassword} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль? <Link className={forgotPasswordStyles.loginLink}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
