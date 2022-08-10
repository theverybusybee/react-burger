import IngredientCardsStyles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientCards({ingredients}) {
  return (
    <li className={IngredientCardsStyles.card}>
      <img
        className="IngredientCards.image"
        src={ingredients.image}
        alt={ingredients.name}
      />
      <div className={IngredientCardsStyles.costContainer}>
        <p className={`${IngredientCards.cost} text text_type_digits-default`}>
          {ingredients.price}
        </p>
        <CurrencyIcon
          className={IngredientCardsStyles.currency}
          type="primary"
        />
      </div>
      <h2 className={`${IngredientCards.name} text text_type_main-small`}>
        {ingredients.name}
      </h2>
      <Counter
        className={IngredientCardsStyles.counter}
        count={1}
        size="default"
      />
    </li>
  );
}
