import resetStyles from "./reset-password-page.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

console.log(resetStyles);

function ResetPasswordPage() {
  return (
    <div className={resetStyles.container}>
      <form className={resetStyles.form} action="">
        <h1 className={`${resetStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          disabled={false}
          icon='ShowIcon'
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          disabled={false}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p
        className={`${resetStyles.recallPassword} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль? <Link className={resetStyles.loginLink}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
