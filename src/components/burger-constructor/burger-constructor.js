import React, { useState, useMemo } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ORDER_NUMBER } from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import {
  SET_CONSTRUCTOR_ELEMENT,
  FILTER_BUNS,
  SET_TOTAL_PRICE,
  RESET_TOTAL_PRICE,
  SET_BUNS,
  SET_ORDER_INGREDIENTS
} from "../../services/actions/draggable-ingredient";
import { Reorder } from "framer-motion";


const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const buns = useSelector((state) => state.dropContainerReducer.buns);
    const totalPrice = useSelector(
    (state) => state.dropContainerReducer.totalPrice
  );

  const [, dropTarget] = useDrop({
    accept: "items",
    drop: (item) => {
      item.type === "bun" && dispatch({ type: SET_BUNS, payload: item });
      buns.length &&
        item.type !== "bun" &&
        dispatch({ type: SET_CONSTRUCTOR_ELEMENT, payload: item });
    },
  });

  const constructorElements = useSelector(
    (state) => state.dropContainerReducer.constructorElements
  );

  const [items, setItems] = useState(constructorElements);

  useMemo(() => {
    dispatch({ type: FILTER_BUNS });
    if (buns.length || constructorElements.length) {
      dispatch({
        type: SET_TOTAL_PRICE,
        payload: constructorElements,
      });
    } else {
      dispatch({
        type: RESET_TOTAL_PRICE,
        payload: constructorElements,
      });
    }
    setItems(constructorElements);
    dispatch({ type: SET_ORDER_INGREDIENTS })
  }, [dispatch, constructorElements, buns]);

  const [isVisible, setVisability] = useState(false);

  const postResult = (ingredients) => {
    dispatch(getOrderNumber(ingredients));
  };  

  const orderIngredients = useSelector(state => state.dropContainerReducer.orderIngredients)

  const setModal = () => {
    postResult(orderIngredients);
    handleOpenModal();
  };

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
    dispatch({ type: RESET_ORDER_NUMBER });
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <div className={BurgerConstructorStyles.dragContainer} ref={dropTarget}>
        {buns.length ? (
          <>
            <ConstructorElements
              type="top"
              ingredient={buns[0]}
              isLocked={true}
            />
            <Reorder.Group
              className={BurgerConstructorStyles.reorder}
              axis="y"
              onReorder={setItems}
              values={items}
            >
              <div className={BurgerConstructorStyles.stuff}>
                {items.map((stuff) => {
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
            </Reorder.Group>
            <ConstructorElements
              type="bottom"
              ingredient={buns[0]}
              isLocked={true}
            />
          </>
        ) : (
          <>
            <div className={BurgerConstructorStyles.topBun}></div>
            <div className={BurgerConstructorStyles.stuff}>
              <p
                className={`${BurgerConstructorStyles.choose} text text_type_main-large`}
              >
                Пожалуйста, выберите булочки
              </p>
            </div>
            <div className={BurgerConstructorStyles.bottomBun}></div>
          </>
        )}
      </div>
      <div className={BurgerConstructorStyles.orderContainer}>
        <div className={BurgerConstructorStyles.priceContainer}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <Button onClick={setModal} type="primary" size="large">
          Оформить заказ
        </Button>
        {isVisible && modalOrderDetails}
      </div>
    </section>
  );
});

export default BurgerConstructor;
