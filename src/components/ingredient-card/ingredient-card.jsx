import React, { useEffect } from "react";
import IngredientCardStyles from "./ingredient-card.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SET_VISIBILITY,
  SET_MODAL_INGREDIENT,
} from "../../services/actions/modal";

const IngredientCard = React.memo(({ ingredient }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const id = ingredient._id;

  useEffect(() => {
    dispatch(() => {
      history.push({ state: { background: location } });
    });
  }, [ingredient]);

  const onClick = () => {
    dispatch({ type: SET_VISIBILITY });
    dispatch({ type: SET_MODAL_INGREDIENT, payload: ingredient });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "items",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const qty = useSelector(
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
          <CurrencyIcon
            className={IngredientCardStyles.currency}
            type="primary"
          />
        </div>
        <h2
          className={`${IngredientCardStyles.name} text text_type_main-small`}
        >
          {ingredient.name}
        </h2>
        {qty ? (
          <Counter
            className={IngredientCardStyles.counter}
            count={qty}
            size="default"
          />
        ) : null}
      </li>
    </Link>
  );
});

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
};

export default IngredientCard;
