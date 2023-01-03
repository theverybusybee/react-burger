import React, { useState, useEffect, useMemo } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/api-data";
import { SET_ORDER_NUMBER_VISIBILITY } from "../../services/constants/modal";
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
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";
import { TIngredient } from "../../services/types/data";

const BurgerConstructor = React.memo(() => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { buns, totalPrice } = useAppSelector(
    (state) => state.dropContainerReducer
  );

  const isOrderNumberVisible = useAppSelector(
    (state) => state.modalReducer.isVisible.orderNumber
  );
  const { createdOrderNumber, createdOrderNumberRequest } = useAppSelector(
    (state) => state.apiDataReducer
  );

  const [, dropTarget] = useDrop({
    accept: "items",
    drop: (item: TIngredient) => {
      item.type === "bun" && dispatch({ type: SET_BUNS, payload: item });
      buns.length &&
        item.type !== "bun" &&
        dispatch({ type: SET_CONSTRUCTOR_ELEMENT, payload: item });
    },
  });

  const constructorElements = useAppSelector(
    (state) => state.dropContainerReducer.constructorElements
  );

  const isLogin = useAppSelector((state) => state.authUserReducer.isLogin);

  const [items, setItems] = useState(constructorElements);

  const totalPriceCounter = useMemo(() => {
    return (
      buns.length &&
      (constructorElements.length
        ? constructorElements
            ?.map((el) => el.price)
            ?.reduce((a, b) => a! + b!, 0)! +
          buns[0].price! * 2
        : buns[0]?.price! * 2)
    );
  }, [constructorElements, dispatch, buns]);

  useEffect(() => {
    dispatch({ type: FILTER_BUNS });
    buns.length || constructorElements.length
      ? dispatch({
          type: SET_TOTAL_PRICE,
          payload: totalPriceCounter,
        })
      : dispatch({
          type: RESET_TOTAL_PRICE,
        });

    setItems(constructorElements);
    dispatch({ type: SET_ORDER_INGREDIENTS });
  }, [dispatch, constructorElements, buns]);

  const postResult = (ingredients: Array<TIngredient>) => {
    dispatch(getOrderNumber(ingredients));
  };

  const orderIngredients = useAppSelector(
    (state) => state.dropContainerReducer.orderIngredients
  );

  const setModal = () => {
    postResult(orderIngredients);
    handleOpenModal();
  };

  const onButtonClick = (e: React.SyntheticEvent) => {
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
          <CurrencyIcon type={"primary"} />
        </div>
        <Button
          onClick={onButtonClick}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Оформить заказ
        </Button>
        {createdOrderNumberRequest && modalOrderDetailsLoading}
        {createdOrderNumber && isOrderNumberVisible && modalOrderDetails}
      </div>
    </section>
  );
});

export default BurgerConstructor;
