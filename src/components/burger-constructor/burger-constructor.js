import React, { useState, useEffect, useMemo } from "react";
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
import { RESET_ORDER_NUMBER, SET_BUNS } from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import {
  SET_CONSTRUCTOR_ELEMENT,
} from "../../services/actions/drop-container";

const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const allIngredients = useSelector((state) => state.reducer.allIngredients);
  const buns = useSelector((state) => state.reducer.buns);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop: (item) => {
      dispatch({ type: SET_CONSTRUCTOR_ELEMENT, payload: item });
    },
    collect: (monitor) => ({ isHover: monitor.isOver() }),
  });

  const constructorElements = useSelector(
    (state) => state.dropContainerReducer.constructorElements
  );
  console.log(constructorElements);

  const totalPrice = useSelector((state) => state.reducer.totalPrice);

  const [isVisible, setVisability] = useState(false);

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
    dispatch({ type: RESET_ORDER_NUMBER });
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      {buns && (
        <div className={BurgerConstructorStyles.dragContainer}>
          <ConstructorElements type="top" ingredient={buns} isLocked={true} />
          <div className={BurgerConstructorStyles.stuff} ref={dropTarget}>
            {constructorElements.map((stuff) => {
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
        </div>
      )}
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
