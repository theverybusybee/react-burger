import { useMemo } from "react";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function IngredientsFilter({ type, openModal, qty }) {
  const allIngredients = useSelector((state) => state.reducer.allIngredients);

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter((ingredient) => ingredient.type === type);
  }, [allIngredients, type]);

  return filteredIngredients.map((ingredient) => {
    return (
      <IngredientCard
        ingredient={ingredient}
        key={ingredient._id}
        openModal={openModal}
        qty={qty}
      />
    );
  });
}

IngredientsFilter.propTypes = {
  type: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired,
};
