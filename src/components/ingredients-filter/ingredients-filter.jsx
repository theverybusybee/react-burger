import { useMemo } from "react";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function IngredientsFilter({ type }) {
  const allIngredients = useSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter((ingredient) => ingredient.type === type);
  }, [allIngredients, type]);

  return filteredIngredients.map((ingredient) => {
    return (
      <IngredientCard
        ingredient={ingredient}
        key={ingredient._id}
      />
    );
  });
}

IngredientsFilter.propTypes = {
  type: PropTypes.string.isRequired,
};
