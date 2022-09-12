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
import { OrderContext } from "../../services/api-context";
import {
  getOrderNumber
} from "../../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ORDER_NUMBER, SET_BUNS } from "../../services/actions/actions";

const BurgerConstructor = React.memo(() => {
  const allIngredients = useSelector(state => state.reducer.allIngredients)
  const buns = useSelector(state => state.reducer.buns)

  const dispatch = useDispatch();

  const [isVisible, setVisability] = useState(false);
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState);

  const stuffing = useMemo(() => {
    return allIngredients.filter((ingredient) => ingredient.type !== "bun");
  }, [allIngredients]);

  const postResult = (ingredients) => {
    dispatch(getOrderNumber(ingredients));
  };

  const setModal = () => {
    postResult(allIngredients);
    handleOpenModal();
  };

  const bunsFilter = useMemo(() => {
    return allIngredients.filter((ingredient) => ingredient.type === "bun");
  }, [allIngredients]);

  useEffect(() => {
    dispatch({ type: SET_BUNS, payload: bunsFilter[0] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allIngredients]);

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
    dispatch({ type: RESET_ORDER_NUMBER })
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <OrderContext.Provider value={{ order, orderDispatcher }}>
        { (buns) && 
          (<div className={BurgerConstructorStyles.dragContainer}>
            <ConstructorElements
              type="top"
              ingredient={buns}
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
              ingredient={buns}
              isLocked={true}
            />
          </div>)
        }
        <div className={BurgerConstructorStyles.orderContainer}>
          <div className={BurgerConstructorStyles.priceContainer}>
            <p className="text text_type_digits-medium">0</p>
            <CurrencyIcon />
          </div>
          <Button onClick={setModal} type="primary" size="large">
            Оформить заказ
          </Button>
          {isVisible && modalOrderDetails}
        </div>
      </OrderContext.Provider>
    </section>
  );
});

export default BurgerConstructor;
