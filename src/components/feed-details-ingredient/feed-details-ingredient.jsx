import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./feed-details-ingredient.module.css";

function FeedDetailsIngredient({ data }) {
  return (
    <li className={ingredientStyles.containerItem}>
      <div className={ingredientStyles.ingredient}>
        <div className={ingredientStyles.ingredientBackground}>
          <img
            className={ingredientStyles.ingredientImage}
            src={data.image}
            alt="image1"
          />
        </div>
      </div>
      <p
        className={`${ingredientStyles.ingredientName} text text_type_main-default`}
      >
        {data.name}
      </p>
      <p
        className={`${ingredientStyles.amountAndCostContainer} text text_type_digits-default`}
      >
        <span className={ingredientStyles.amount}>2</span> x{" "}
        <span className={ingredientStyles.price}>200</span>
        <CurrencyIcon className={ingredientStyles.currency} type="primary" />
      </p>
    </li>
  );
}

export default FeedDetailsIngredient;
