import { useMemo } from "react";
import IngredientCard from "../ingredient-card/ingredient-card";
import { useAppSelector } from "../../services/redux-hooks";

interface IIngredientsFilter {
  type: string;
}

export default function IngredientsFilter({ type }: IIngredientsFilter) {
  const allIngredients = useAppSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter((ingredient) => ingredient.type === type);
  }, [allIngredients, type]);

  return (
    <>
      {filteredIngredients.map((ingredient) => {
        return <IngredientCard ingredient={ingredient} key={ingredient._id} />;
      })}
    </>
  );
}
