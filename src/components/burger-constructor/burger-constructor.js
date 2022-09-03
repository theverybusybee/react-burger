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
import fetchOrderDetails from "../../utils/fetchOrderData";
import { OrderContext } from "../../services/api-context";
import reducer from "../../services/reducers/api-reducer";
import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_ERROR,
} from "../../services/actions/actions";

const BurgerConstructor = React.memo(() => {
  const ingredients = useContext(ApiContext);

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
    return ingredients.filter((ingredient) => ingredient.type !== "bun");
  }, [ingredients]);

  const postResult = useMemo(() => {
    return function () {
      apiDispatcher({ type: FETCH_API_REQUEST });
      fetchOrderDetails(ingredients)
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
  }, [ingredients]);

  const { data } = apiIngredientsState;

  const setModal = () => {
    postResult();
    handleOpenModal();
  };

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
