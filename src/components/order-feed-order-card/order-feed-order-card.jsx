import OrderCardStyles from "./order-feed-order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

function OrderFeedOrderCard({ data }) {

  console.log(data.number)
  
  const allIngredients = useSelector((state) => state.apiDataReducer.allIngredients)

  return (
    <div className={OrderCardStyles.container}>
      <p className={`${OrderCardStyles.number} text text_type_digits-default`}>
        {data.number}
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
          console.log(ingredientImage)
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
  );
}

export default OrderFeedOrderCard;
