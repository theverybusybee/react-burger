import OrderCardStyles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_ORDER } from "../../services/constants/feed-data";
import { useCallback, memo, useMemo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDate } from "../../utils/constants";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";
import { TOrders } from "../../services/types/data";

interface IOrderFeedCard {
  data: TOrders;
}

function OrderFeedCard({ data }: IOrderFeedCard) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = data._id;
  const allIngredients = useAppSelector(
    (state) => state.apiDataReducer.allIngredients
  );
  const orderIngredients = data.ingredients;

  const currentOrder = useAppSelector(
    (state) => state.feedDataReducer.currentOrder
  );

  const lastImage = allIngredients.find((el) => el._id === orderIngredients[6]);

  const foundIngredients = useMemo(() => {
    return orderIngredients.map((item) => {
      return allIngredients?.find((el) => el._id === item);
    });
  }, [data, allIngredients]);
  console.log(
    foundIngredients.length - 1 > 5 ? 5 : foundIngredients.length - 1
  );
  const totalPrice = useMemo(() => {
    const prices = foundIngredients.map((el) => el?.price);
    return prices.length ? prices.reduce((a, b) => a! + b!, 0) : [];
  }, [data, allIngredients]);

  const openModal = useCallback(() => {
    dispatch({ type: SET_CURRENT_ORDER, payload: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

  const [orderStatus, setOrderStatus] = useState({
    status: "",
    className: "",
  });

  useEffect(() => {
    data &&
      setOrderStatus({
        status:
          data.status === "created"
            ? "Создан"
            : data.status === "pending"
            ? "Готовится"
            : "Выполнен",

        className:
          data.status === "created"
            ? "orderIsCreated"
            : data.status === "pending"
            ? "orderIsPending"
            : "orderIsDone",
      });
  }, [data]);

  return (
    <Link
      className={OrderCardStyles.link}
      to={{
        pathname: `${location.pathname}/${id}`,
        state: { background: location },
      }}
    >
      <div className={OrderCardStyles.container} onClick={openModal}>
        <p
          className={`${OrderCardStyles.number} text text_type_digits-default`}
        >
          &#35;{data.number}
        </p>
        <p
          className={`${OrderCardStyles.createdAt} text text_type_main-default text_color_inactive`}
        >
          {getDate(data.createdAt.toString())}
        </p>
        <p className={`${OrderCardStyles.name} text text_type_main-medium`}>
          {data.name}
        </p>
        <p
          className={`${OrderCardStyles.order} ${orderStatus.className} text text_type_main-default`}
        >
          {orderStatus.status}
        </p>
        <ul className={OrderCardStyles.ingredients}>
          {foundIngredients
            .slice(
              -(foundIngredients.length - 1 > 5
                ? 5
                : foundIngredients.length - 1)
            )
            ?.map((item, index) => {
              return (
                item !== undefined && (
                  <IngredientIcon
                    type="ordinary ingredient"
                    ingredient={item}
                    key={index}
                    tagType="li"
                  />
                )
              );
            })}

          {lastImage && foundIngredients.length ? (
            <IngredientIcon
              type="last ingredient"
              lastIngredient={foundIngredients[foundIngredients.length - 1]}
              ingredientsArray={data.ingredients}
              tagType="li"
              key="6"
            />
          ) : null}
        </ul>
        <div className={OrderCardStyles.priceContainer}>
          <p
            className={`${OrderCardStyles.price} text text_type_digits-default`}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default memo(OrderFeedCard);
