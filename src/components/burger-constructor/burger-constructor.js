import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ApiContext } from "../../services/api-context";
import orderReducer, {
  orderInitialState,
} from "../../services/reducers/order-reducer";
import useFetchOrderDetails from "../../services/hooks/useFetchOrderData";
import { OrderContext } from "../../services/api-context";

const BurgerConstructor = React.memo(() => {
  const ingredients = useContext(ApiContext);

  const [isVisible, setVisability] = useState(false);
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState);

  const stuffing = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type !== "bun");
  }, [ingredients]);

  const buns = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === "bun");
  }, [ingredients]);

  useEffect(() => {
    orderDispatcher({ type: "SET_BUNS", payload: buns[0] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
  }

  const { data } = useFetchOrderDetails(ingredients);

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails orderData={data} />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <OrderContext.Provider value={{ order, orderDispatcher }}>
        {order.buns && (
          <div className={BurgerConstructorStyles.dragContainer}>
            <ConstructorElements
              type="top"
              ingredient={order.buns}
              isLocked={true}
            />
            <div className={BurgerConstructorStyles.stuff}>
              {stuffing.map((stuff) => {
                return (
                  <ConstructorElements
                    ingredient={stuff}
                    key={stuff._id}
                    type="stuffing"
                    isLocked={false}
                  />
                );
              })}
            </div>
            <ConstructorElements
              type="bottom"
              ingredient={order.buns}
              isLocked={true}
            />
          </div>
        )}
        <div className={BurgerConstructorStyles.orderContainer}>
          <div className={BurgerConstructorStyles.priceContainer}>
            <p className="text text_type_digits-medium">{order.totalPrice}</p>
            <CurrencyIcon />
          </div>
          <Button onClick={handleOpenModal} type="primary" size="large">
            Оформить заказ
          </Button>
          {isVisible && modalOrderDetails}
        </div>
      </OrderContext.Provider>
    </section>
  );
});

export default BurgerConstructor;
