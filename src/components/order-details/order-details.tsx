import React from "react";
import orderStyles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/redux-hooks";

const OrderDetails = React.memo(() => {
  const createdOrderNumber = useAppSelector(
    (state) => state.apiDataReducer.createdOrderNumber
  );

  return (
    <div className={orderStyles.container}>
      <p className={`${orderStyles.number} text text_type_digits-large`}>
        {createdOrderNumber}
      </p>
      <p className={`${orderStyles.caption} text text_type_main-medium`}>
        идентификатор заказа
      </p>
      <div className={orderStyles.done}>
        <CheckMarkIcon type="primary" />
      </div>
      <div className={orderStyles.confirmationContainer}>
        <p className={`${orderStyles.paragraph} text text_type_main-default`}>
          Ваш заказ начали готовить
        </p>
        <p
          className={`${orderStyles.paragraph} text text_type_main-default text_color_inactive`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
});

export default OrderDetails;
