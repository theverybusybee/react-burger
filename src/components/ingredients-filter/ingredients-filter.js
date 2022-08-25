import { useContext } from "react";
import { ApiContext } from "../../services/api-context";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";

export default function IngredientsFilter({ type, openModal }) {
  const ingredients = useContext(ApiContext);
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  return (
    <>
      {filteredIngredients.map((ingredient) => {
        return (
          <IngredientCard
            ingredient={ingredient}
            key={ingredient._id}
            openModal={openModal}
          />
        );
      })}
    </>
  );
}

IngredientsFilter.propTypes = {
  type: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
