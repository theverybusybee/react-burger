import React, { useState, useReducer, useEffect, useMemo } from "react";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElements from "../constructor-elements/constructor-elements";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import orderReducer, {
  orderInitialState,
} from "../../services/reducers/order-reducer";
import fetchOrderDetails from "../../utils/fetchOrderData";
import { OrderContext } from "../../services/api-context";
import reducer from "../../services/reducers/api-reducer";
import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_ERROR,
} from "../../services/actions/actions";
import {
  SET_CURRENT_CONSTRUCTOR_INGREDIENTS,
  SET_BUNS,
  DELETE_MODAL_INGREDIENT,
} from "../../services/actions/order";
import { useDispatch, useSelector } from "react-redux";

const BurgerConstructor = React.memo(() => {
  // const ingredients = useContext(ApiContext);
  const dispatch = useDispatch();

  const { allIngredients, currentConstructorIngredients, buns } = useSelector(
    (state) => state.order
  );

  useMemo(() => {
    dispatch({
      type: SET_CURRENT_CONSTRUCTOR_INGREDIENTS,
      payload: allIngredients,
    });
  }, [allIngredients, dispatch]);

  const [isVisible, setVisability] = useState(false);
  const [order, orderDispatcher] = useReducer(orderReducer, orderInitialState);
  const apiInitialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [apiIngredientsState, apiDispatcher] = useReducer(
    reducer,
    apiInitialState
  );

  const stuffing = useMemo(() => {
    return currentConstructorIngredients.filter(
      (ingredient) => ingredient.type !== "bun"
    );
  }, [currentConstructorIngredients]);

  const postResult = useMemo(() => {
    return function () {
      apiDispatcher({ type: FETCH_API_REQUEST });
      fetchOrderDetails(currentConstructorIngredients)
        .then((res) => {
          if (res && res.success) {
            apiDispatcher({
              type: FETCH_API_SUCCESS,
              payload: res.order.number,
            });
          } else {
            apiDispatcher({ type: FETCH_API_ERROR });
          }
        })
        .catch((error) =>
          apiDispatcher({
            type: FETCH_API_ERROR,
            payload: error,
          })
        );
    };
  }, [currentConstructorIngredients]);

  const { data } = apiIngredientsState;

  const setModal = () => {
    postResult();
    handleOpenModal();
  };

  const allBuns = useMemo(() => {
    return currentConstructorIngredients.filter(
      (ingredient) => ingredient.type === "bun"
    );
  }, [currentConstructorIngredients]);

  useMemo(() => {
    dispatch({ type: SET_BUNS, payload: allBuns[0] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOpenModal() {
    setVisability(true);
  }

  function handleCloseModal() {
    setVisability(false);
  }

  const modalOrderDetails = (
    <Modal onClose={handleCloseModal} isOpened={isVisible}>
      <OrderDetails orderData={data} />
    </Modal>
  );

  return (
    <section className={BurgerConstructorStyles.main}>
      <OrderContext.Provider value={{ order, orderDispatcher }}>
        {buns && (
          <div className={BurgerConstructorStyles.dragContainer}>
            <ConstructorElements type="top" ingredient={buns} isLocked={true} />
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
          </div>
        )}
        <div className={BurgerConstructorStyles.orderContainer}>
          <div className={BurgerConstructorStyles.priceContainer}>
            <p className="text text_type_digits-medium">{order.totalPrice}</p>
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
