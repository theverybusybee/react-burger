import React, { useState, useEffect } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/api-data";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ORDER_NUMBER_VISIBILITY,
} from "../../services/constants/modal";
import { RESET_ORDER_NUMBER } from "../../services/constants/api-data";
import { useDrop } from "react-dnd";
import {
  SET_CONSTRUCTOR_ELEMENT,
  FILTER_BUNS,
  SET_TOTAL_PRICE,
  RESET_TOTAL_PRICE,
  SET_BUNS,
  SET_ORDER_INGREDIENTS,
  RESET_ORDER_INGREDIENTS,
} from "../../services/constants/drop-container";
import { Reorder } from "framer-motion";
import { useHistory } from "react-router-dom";
import ApiLoader from "../api-loader/api-loader";

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { buns, totalPrice } = useSelector(
    (state) => state.dropContainerReducer
  );

  const isOrderNumberVisible = useSelector(
    (state) => state.modalReducer.isVisible.orderNumber
  );
  const { createdOrderNumber, createdOrderNumberRequest } = useSelector(
    (state) => state.apiDataReducer
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

  const isLogin = useSelector((state) => state.authUserReducer.isLogin);

  const [items, setItems] = useState(constructorElements);

  useEffect(() => {
    dispatch({ type: FILTER_BUNS });
    buns.length || constructorElements.length
      ? dispatch({
          type: SET_TOTAL_PRICE,
          payload: constructorElements,
        })
      : dispatch({
          type: RESET_TOTAL_PRICE,
          payload: constructorElements,
        });

    setItems(constructorElements);
    dispatch({ type: SET_ORDER_INGREDIENTS });
  }, [dispatch, constructorElements, buns]);

  const postResult = (ingredients) => {
    dispatch(getOrderNumber(ingredients));
  };

  const orderIngredients = useSelector(
    (state) => state.dropContainerReducer.orderIngredients
  );

  const setModal = () => {
    postResult(orderIngredients);
    handleOpenModal();
  };

  const onButtonClick = (e) => {
    if (!isLogin) {
      e.preventDefault();
      history.push("/login");
    } else {
      setModal();
    }
  };

  function handleOpenModal() {
    dispatch({ type: SET_ORDER_NUMBER_VISIBILITY });
  }

  function handleCloseModal() {
    dispatch({ type: RESET_ORDER_NUMBER });
    dispatch({ type: RESET_ORDER_INGREDIENTS });
    console.log('12344')
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isOrderNumberVisible}>
      <OrderDetails />
    </Modal>
  );

  const modalOrderDetailsLoading = (
    <Modal onClose={handleCloseModal}>
      <ApiLoader />
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
                      key={stuff.uuid}
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
        <Button onClick={onButtonClick} type="primary" size="large">
          Оформить заказ
        </Button>
        {createdOrderNumberRequest && modalOrderDetailsLoading}
        {createdOrderNumber && isOrderNumberVisible && modalOrderDetails}
      </div>
    </section>
  );
});

export default BurgerConstructor;
