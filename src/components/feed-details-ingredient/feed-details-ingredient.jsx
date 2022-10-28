import ingredientStyles from "./feed-details-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, memo, useCallback } from "react";
import IngredientIcon from "../ingredient-icon/ingredient-icon";

function FeedDetailsIngredient({ data }) {
  const [orderState, setOrderState] = useState({
    ingredients: [],
    price: 0,
    reducedIngredients: [],
  });

  const { ingredients, reducedIngredients } = orderState;

  const qty = useCallback(
    (currentIngredientId) => {
      if (ingredients.length) {
        return ingredients.filter(
          (ingredient) => ingredient._id === currentIngredientId
        ).length;
      }
    },
    [ingredients]
  );

  useEffect(() => {
    if (data.length) {
      setOrderState({
        ...orderState,
        ingredients: data,
        price: data.map((el) => el.price).reduce((a, b) => a + b),
        reducedIngredients: Array.from(new Set(data)),
      });
    }
  }, [data]);

  return reducedIngredients.length
    ? reducedIngredients.map((ingredient) => {
        return (
          <li className={ingredientStyles.containerItem}>
            <IngredientIcon
              type="ordinary ingredient"
              ingredient={ingredient}
              key={ingredient.uuid}
              tagType='div'
            />
            <p
              className={`${ingredientStyles.ingredientName} text text_type_main-default`}
            >
              {ingredient.name}
            </p>
            <p
              className={`${ingredientStyles.amountAndCostContainer} text text_type_digits-default`}
            >
              <span className={ingredientStyles.amount}>
                {qty(ingredient._id)}
              </span>{" "}
              x{" "}
              <span className={ingredientStyles.price}>{ingredient.price}</span>
              <CurrencyIcon
                className={ingredientStyles.currency}
                type="primary"
              />
            </p>
          </li>
        );
      })
    : null;
}

export default memo(FeedDetailsIngredient);
