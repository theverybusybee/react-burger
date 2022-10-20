import OrderCardStyles from "./order-feed-order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderFeedOrderCard({ data }) {
  return (
    <div className={OrderCardStyles.container}>
      <p className={`${OrderCardStyles.number} text text_type_digits-default`}>
        {data.orderNumber}
      </p>
      <p
        className={`${OrderCardStyles.time} text text_type_main-default text_color_inactive`}
      >
        {data.orderTime}
      </p>
      <p className={`${OrderCardStyles.name} text text_type_main-medium`}>
        {data.orderName}
      </p>
      <ul className={OrderCardStyles.ingredients}>
        {data.orderIngredients.map((el) => {
          return (
            <li className={OrderCardStyles.ingredient}>
              <div className={OrderCardStyles.ingredientBackground}>
                <img
                  className={OrderCardStyles.ingredientImage}
                  src={el.orderImage}
                  alt="image1"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={OrderCardStyles.priceContainer}>
        <p className={`${OrderCardStyles.price} text text_type_digits-default`}>
          {data.orderPrice}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default OrderFeedOrderCard;
