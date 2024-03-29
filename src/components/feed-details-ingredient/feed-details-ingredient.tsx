import ingredientStyles from "./feed-details-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useCallback, useMemo } from "react";
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import { TIngredient } from "../../services/types/data";

interface IFeedDetailsIngredient {
  data: any;
}

type TOrderState = {
  ingredients: Array<TIngredient>;
  price: number;
  reducedIngredients: Array<TIngredient>;
};

function FeedDetailsIngredient({ data }: IFeedDetailsIngredient) {
  const [orderState, setOrderState] = useState<TOrderState>({
    ingredients: [],
    price: 0,
    reducedIngredients: [],
  });
  const { ingredients, reducedIngredients } = orderState;

  const qty = useCallback(
    (currentIngredientId: string) => {
      if (ingredients.length) {
        return ingredients.filter(
          (ingredient) => ingredient._id === currentIngredientId
        ).length;
      }
    },
    [ingredients]
  );

  const setPrice = useMemo(() => {
    return data
      ?.map((el: TIngredient) => el.price)
      .reduce((a: number, b: number) => a! + b!, 0);
  }, []);

  useEffect(() => {
    if (data?.length) {
      setOrderState({
        ...orderState,
        ingredients: data,
        price: setPrice!,
        reducedIngredients: Array.from(new Set(data)),
      });
    }
  }, [data]);

  return (
    <>
      {reducedIngredients.length
        ? reducedIngredients.map((ingredient) => {
            return (
              <li
                className={ingredientStyles.containerItem}
                key={ingredient._id}
              >
                <IngredientIcon
                  type="ordinary ingredient"
                  ingredient={ingredient}
                  key={ingredient.uuid}
                  tagType="div"
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
                    {qty(ingredient._id!)}
                  </span>{" "}
                  x{" "}
                  <span className={ingredientStyles.price}>
                    {ingredient.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </p>
              </li>
            );
          })
        : null}
    </>
  );
}

export default FeedDetailsIngredient;
