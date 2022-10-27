import detailsStyles from "./ingredient-details.module.css";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const [ingredient, setIngredient] = useState({
    image: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  });

  const allIngredients = useSelector(
    (state) => state.apiDataReducer.allIngredients
  );

  const { id } = useParams();
  useEffect(() => {
    if (allIngredients.length) {
      const ingredient = allIngredients.find((el) => el._id === id);
      if (ingredient) {
        setIngredient({
          image: ingredient.image_large,
          name: ingredient.name,
          calories: ingredient.calories,
          proteins: ingredient.proteins,
          fat: ingredient.fat,
          carbohydrates: ingredient.carbohydrates,
        });
      }
    }
  }, [allIngredients]);

  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    image && (
      <div className={detailsStyles.main}>
        <h2 className={`${detailsStyles.title} text text_type_main-large`}>
          Детали ингредиента
        </h2>
        <figure className={detailsStyles.imgContainer}>
          <img className={detailsStyles.img} src={image} alt={name} />
          <figcaption
            className={`${detailsStyles.caption} text text_type_main-medium`}
          >
            {name}
          </figcaption>
        </figure>

        <table
          className={`${detailsStyles.nutrValTable} text text_type_main-small text_color_inactive`}
        >
          <thead>
            <tr>
              <td className={detailsStyles.nutrValCell}>Калории,ккал</td>
              <td>Белки, г</td>
              <td>Жиры, г</td>
              <td>Углеводы, г</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{calories}</td>
              <td>{proteins}</td>
              <td>{fat}</td>
              <td>{carbohydrates}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
}

export default memo(IngredientDetails);
