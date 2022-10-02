import profileStyles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.buttonsContainer}>
        <button
          className={`${profileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
        >
          Профиль
        </button>
        <button
          className={`${profileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
        >
          История заказов
        </button>
        <button
          className={`${profileStyles.button} text text_type_main-medium text_color_inactive`}
          type="secondary"
          size="large"
        >
          Выход
        </button>
      </div>

      <form className={profileStyles.userData}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

        <Input
          type={"text"}
          placeholder={"Логин"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

        <Input
          type={"password"}
          placeholder={"Пароль"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

        <profileStyles name={"password"} />
      </form>

      <p
        className={`${profileStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </div>
  );
}

export default Profile;
