/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetailsStyles from "./order-feed-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import FeedDetailsIngredient from "../../components/feed-details-ingredient/feed-details-ingredient";
import { useParams } from "react-router-dom";
import { useMemo, useEffect, useState, memo } from "react";
import { getDate } from "../../utils/constants";

function OrderFeedDetails() {
  const allIngredients = useSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const allOrders = useSelector(
    (state) => state.wsReducer.allOrders.orders
  );

  console.log(allOrders)

  const [order, setOrder] = useState({
    createdAt: "",
    ingredients: [],
    name: "",
    number: 0,
    status: "",
    updatedAt: "",
    _id: "",
  });

  const { ingredients, createdAt, number } = order;

  const ingredient = useMemo(() => {
    if (!!ingredients) {
      return ingredients.map((item) => {
        return allIngredients.find((el) => el._id === item);
      });
    }
  }, [ingredients, allIngredients]);

  const orderPrice = useMemo(() => {
    if(ingredient.length) {
      return ingredient.map((item) => item.price).reduce((a, b) => a + b)
    }
  })

  const { id } = useParams();
  const currentOrder = useMemo(() => {
    if (!!allOrders) {
      return allOrders.find((el) => el._id === id);
    }
  }, [allOrders]);

  useEffect(() => {
    if (!!currentOrder) {
      setOrder({
        createdAt: getDate(currentOrder.createdAt.toString()),
        ingredients: currentOrder.ingredients,
        name: currentOrder.name,
        number: currentOrder.number,
        status: currentOrder.status,
        updatedAt: currentOrder.updatedAt,
        _id: currentOrder._id,
      });
    }

  }, [currentOrder, ingredient.length]);

  return (!!ingredients || ingredient) ? (
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
           <FeedDetailsIngredient data={ingredient} key={ingredient}  />
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
          <CurrencyIcon className={FeedDetailsStyles.currency} type="primary" />
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(OrderFeedDetails);
