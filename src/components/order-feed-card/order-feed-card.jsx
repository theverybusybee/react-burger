import OrderCardStyles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_ORDER } from "../../services/actions/feed-data";
import { useCallback, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SET_ORDER_VISIBILITY } from "../../services/actions/modal";
import { getDate } from "../../utils/constants";

function OrderFeedCard({ data }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = data._id;
  const allIngredients = useSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const currentOrder = useSelector(
    (state) => state.feedDataReducer.currentOrder
  );
  const lastImage = data.ingredients[6];

  const totalPrice = useMemo(() => {
    return data.ingredients
      .map((item) => {
        return allIngredients.find((el) => el._id === item);
      })
      .map((el) => el.price)
      .reduce((a, b) => a + b);
  }, [data, allIngredients]);

  const openModal = useCallback(() => {
    dispatch({ type: SET_CURRENT_ORDER, payload: data });
    dispatch({ type: SET_ORDER_VISIBILITY });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

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
        <ul className={OrderCardStyles.ingredients}>
          {data.ingredients.slice(0, 5).map((item) => {
            const ingredient = allIngredients.find((el) => el._id === item);
            return (
              <li className={OrderCardStyles.ingredient}>
                <div className={OrderCardStyles.ingredientBackground}>
                  <img
                    className={OrderCardStyles.ingredientImage}
                    src={ingredient.image_large}
                    alt={ingredient.name}
                  />
                </div>
              </li>
            );
          })}

          {lastImage ? (
            <li className={OrderCardStyles.ingredient}>
              <div className={OrderCardStyles.ingredientBackground}>
                <img
                  className={`${OrderCardStyles.ingredientImage} ${OrderCardStyles.lastIngredient}`}
                  src={allIngredients.find((el) => el._id === lastImage)?.image}
                  alt="ingredient"
                />
                <p
                  className={`${OrderCardStyles.ingredientsAmount} text text_type_digits-default`}
                >
                  &#43;{`${data.ingredients.length - 6}`}
                </p>
              </div>
            </li>
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
