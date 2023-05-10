import FormStyles from "./profile-forms.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";

import { updateData } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";

function ProfileForms() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const currentUserName = useAppSelector(
    (state) => state.authUserReducer.userInfo.name
  );
  const currentUserEmail = useAppSelector(
    (state) => state.authUserReducer.userInfo.email
  );

  useEffect(() => {
    setForm({
      ...form,
      email: currentUserEmail,
      name: currentUserName,
    });
  }, [currentUserEmail, currentUserName]);

  const resetForm = () => {
    setForm({ email: currentUserEmail, name: currentUserName, password: "" });
  };

  const updateUserData = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateData({name: form.name, email: form.email}));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className={FormStyles.userData} onSubmit={updateUserData}>
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
        {(currentUserEmail !== form.email || currentUserName !== form.name) && (
          <div className={FormStyles.buttonsContainer}>
            <Button
              type="secondary"
              size="medium"
              htmlType="reset"
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
        )}
      </form>

      <p
        className={`${FormStyles.paragraph} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </>
  );
}

export default ProfileForms;
