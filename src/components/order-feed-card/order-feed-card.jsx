import OrderCardStyles from "./order-feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_ORDER } from "../../services/actions/feed-data";
import { useCallback, memo } from "react";
import { Link, useLocation } from 'react-router-dom'

function OrderFeedCard({ data }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = data._id;
  const allIngredients = useSelector((state) => state.apiDataReducer.allIngredients)
  const currentOrder = useSelector((state) => state.feedDataReducer.currentOrder)
  console.log(currentOrder)

  const openModal = useCallback(() => {
    dispatch({type: SET_CURRENT_ORDER, payload: data})
  }, [currentOrder])

  return (
    <Link className={OrderCardStyles.link} to={{ pathname: `/profile/orders/${id}` }}>
       <div className={OrderCardStyles.container} onClick={openModal}>
      <p className={`${OrderCardStyles.number} text text_type_digits-default`}>
        &#35;{data.number}
      </p>
      <p
        className={`${OrderCardStyles.createdAt} text text_type_main-default text_color_inactive`}
      >
        {data.createdAt}
      </p>
      <p className={`${OrderCardStyles.name} text text_type_main-medium`}>
        {data.name}
      </p>
      <ul className={OrderCardStyles.ingredients}>
        {data.ingredients.map((item) => {
          const ingredientImage = allIngredients.find((el) => el._id === item)?.image
          return (
            <li className={OrderCardStyles.ingredient}>
              <div className={OrderCardStyles.ingredientBackground}>
                <img
                  className={OrderCardStyles.ingredientImage}
                  src={ingredientImage}
                  alt="image1"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={OrderCardStyles.priceContainer}>
        <p className={`${OrderCardStyles.price} text text_type_digits-default`}>
          324234
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
    </Link>
   
  );
}

export default memo(OrderFeedCard);
