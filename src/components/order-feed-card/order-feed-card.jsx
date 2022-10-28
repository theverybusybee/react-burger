import OrderCardStyles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_ORDER } from "../../services/actions/feed-data";
import { useCallback, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SET_ORDER_VISIBILITY } from "../../services/actions/modal";
import { getDate } from "../../utils/constants";
import IngredientIcon from "../ingredient-icon/ingredient-icon";

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
  const lastImage = allIngredients.find((el) => el._id === data.ingredients[6]);

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
          {data.ingredients.slice(0, 5).map((item, index) => {
            const ingredient = allIngredients.find((el) => el._id === item);
            return (
              <IngredientIcon
                type="ordinary ingredient"
                ingredient={ingredient}
                key={index}
                tagType='li'
              />
            );
          })}

          {lastImage ? (
            <IngredientIcon
              type="last ingredient"
              lastIngredient={lastImage}
              ingredientsArray={data.ingredients}
              tagType='li'
              key='6'
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
