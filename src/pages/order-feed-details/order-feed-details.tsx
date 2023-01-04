/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetailsStyles from "./order-feed-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsIngredient from "../../components/feed-details-ingredient/feed-details-ingredient";
import { useParams } from "react-router-dom";
import { useMemo, useEffect, useState, memo } from "react";
import { getDate } from "../../utils/constants";
import { useAppSelector } from "../../services/redux-hooks";
import { TIngredient, TOrders, useAppParams } from "../../services/types/data";

function OrderFeedDetails() {
  const allIngredients = useAppSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const allOrders = useAppSelector((state) => state.wsReducer.allOrders.orders);

  const initOrderState: TOrders = {
    _id: "",
    ingredients: [],
    status: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    number: 0,
  };

  const [order, setOrder] = useState<TOrders>(initOrderState);
  const { id }: useAppParams = useParams();

  const { ingredients, createdAt, number } = order;

  const currentOrder = useMemo(() => {
    if (!!allOrders) {
      return allOrders.find((el) => el._id === id);
    }
  }, [allOrders]);

  useEffect(() => {
    if (!!currentOrder) {
      setOrder({
        _id: currentOrder._id,
        ingredients: currentOrder.ingredients,
        status: currentOrder.status,
        name: currentOrder.name,
        createdAt: getDate(currentOrder.createdAt),
        updatedAt: currentOrder.updatedAt,
        number: currentOrder.number,
      });
    }
  }, [currentOrder]);

  const ingredient = useMemo(() => {
    if (ingredients) {
      return ingredients.map((item: string) => {
        return allIngredients.find((el: TIngredient) => {
          return el?._id === item;
        });
      });
    }
  }, [ingredients, allIngredients]);

  const orderPrice = useMemo(() => {
    return ingredient!.map((item) => item?.price).reduce((a, b) => a! + b!, 0);
  }, [ingredient]);

  return !!ingredients || ingredient ? (
    <div className={FeedDetailsStyles.main}>
      <p
        className={`${FeedDetailsStyles.number} text text_type_digits-default`}
      >
        &#35;{number}
      </p>
      <div>
        <p className={`text text_type_main-medium`}>
          Black Hole Singularity острый бургер
        </p>
        <p className={`${FeedDetailsStyles.status} text text_type_main-small`}>
          Выполнен
        </p>
      </div>
      <div>
        <p className={`text text_type_main-medium`}>Состав:</p>
        <ul className={FeedDetailsStyles.ordersContainer}>
          {typeof ingredient !== "undefined" && (
            <FeedDetailsIngredient data={ingredient} />
          )}
        </ul>
      </div>

      <div className={FeedDetailsStyles.timeAndPriceContainer}>
        <p
          className={`${FeedDetailsStyles.time} text text_type_main-default text_color_inactive`}
        >
          {createdAt}
        </p>
        <div className={FeedDetailsStyles.totalPriceContainer}>
          <p
            className={`${FeedDetailsStyles.totalPrice} text text_type_digits-default`}
          >
            {orderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(OrderFeedDetails);
