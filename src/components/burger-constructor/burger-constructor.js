import { useState, useContext } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import BunElements from "../bun-elements/bun-elements";
import StuffElements from "../stuff-elements/stuff-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ApiContext } from "../../services/api-context";

export default function BurgerConstructor() {
  const [isVisible, setVisability] = useState(false);
  const ingredients = useContext(ApiContext);

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails />
    </Modal>
  );

  const stuffing = ingredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <BunElements>
        <div className={BurgerConstructorStyles.stuff}>
          {stuffing.map((stuff) => {
            return <StuffElements ingredient={stuff} key={stuff._id} />;
          })}
        </div>
      </BunElements>
      <div className={BurgerConstructorStyles.orderContainer}>
        <div className={BurgerConstructorStyles.priceContainer}>
          <p className="text text_type_digits-medium">620</p>
          <CurrencyIcon />
        </div>
        <Button onClick={handleOpenModal} type="primary" size="large">
          Оформить заказ
        </Button>
        {isVisible && modalOrderDetails}
      </div>
    </section>
  );
}

