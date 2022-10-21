import FeedDetailsStyles from "./order-feed-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import FeedDetailsIngredient from "../../components/feed-details-ingredient/feed-details-ingredient";

function OrderFeedDetails({ data }) {
  const allIngredients = useSelector(
    (state) => state.apiDataReducer.allIngredients
  );
  return (
    <div className={FeedDetailsStyles.main}>
      <p
        className={`${FeedDetailsStyles.number} text text_type_digits-default`}
      >
        &#35;{data.number}
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
          {data.ingredients.map((item) => {
            const ingredient = allIngredients.find((el) => el._id === item);
            return <FeedDetailsIngredient data={ingredient} />;
          })}
        </ul>
      </div>

      <div className={FeedDetailsStyles.timeAndPriceContainer}>
        <p
          className={`${FeedDetailsStyles.time} text text_type_main-default text_color_inactive`}
        >
          {data.createdAt}
        </p>
        <div className={FeedDetailsStyles.totalPriceContainer}>
          <p
            className={`${FeedDetailsStyles.totalPrice} text text_type_digits-default`}
          >
            433
          </p>
          <CurrencyIcon className={FeedDetailsStyles.currency} type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderFeedDetails;
