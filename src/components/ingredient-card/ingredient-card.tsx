import React from "react";
import IngredientCardStyles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { SET_MODAL_INGREDIENT } from "../../services/constants/modal";
import { TIngredient } from "../../services/types/data";
import { useAppDispatch, useAppSelector } from "../../services/redux-hooks";

interface IIngredientCard {
  ingredient: TIngredient;
}

const IngredientCard = React.memo(({ ingredient }: IIngredientCard) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const id = ingredient._id;

  const onClick = () => {
    dispatch({ type: SET_MODAL_INGREDIENT, payload: ingredient });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "items",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const qty = useAppSelector(
    (state) =>
      state.dropContainerReducer.orderIngredients.filter(
        (item) => item._id === ingredient._id
      ).length
  );

  return (
    <Link
      className={IngredientCardStyles.link}
      to={{ pathname: `/ingredients/${id}`, state: { background: location } }}
    >
      <li
        ref={dragRef}
        style={{ opacity }}
        className={IngredientCardStyles.card}
        onClick={onClick}
      >
        <img
          className={IngredientCardStyles.image}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={IngredientCardStyles.costContainer}>
          <p
            className={`${IngredientCardStyles.cost} text text_type_digits-default`}
          >
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <h2
          className={`${IngredientCardStyles.name} text text_type_main-small`}
        >
          {ingredient.name}
        </h2>
        {qty ? <Counter count={qty} size="default" /> : null}
      </li>
    </Link>
  );
});

export default IngredientCard;
