import FormStyles from "./profile-forms.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useState, useEffect } from "react";

import { updateData } from "../../services/actions/auth";

function ProfileForms() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const currentUserName = useSelector(
    (state) => state.authUserReducer.userInfo.name
  );
  const currentUserEmail = useSelector(
    (state) => state.authUserReducer.userInfo.email
  );

  useEffect(() => {
    setForm({ ...form, email: currentUserEmail, name: currentUserName });
  }, [currentUserEmail, currentUserName]);

  const resetForm = () => {
    setForm({ email: "", name: "", password: "" });
  };

  const updateUserData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateData(form.name, form.email));
    },
    [form]
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className={FormStyles.userData}>
        <Input
          onChange={onInputChange}
          value={form.name}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

        <Input
          onChange={onInputChange}
          value={form.email}
          type={"text"}
          placeholder={"Логин"}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>

        <Input
          value={form.password}
          onChange={onInputChange}
          type={"password"}
          placeholder={"Пароль"}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        ></Input>
      </form>

      <p
        className={`${FormStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
      {form.email || form.name || form.password ? (
        <div className={FormStyles.buttonsContainer}>
          <Button type="secondary" size="medium" onClick={resetForm}>
            Отмена
          </Button>
          <Button type="primary" size="medium" onClick={updateUserData}>
            Сохранить
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default ProfileForms;
