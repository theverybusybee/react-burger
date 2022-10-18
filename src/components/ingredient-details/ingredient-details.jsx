import detailsStyles from "./ingredient-details.module.css";
import { memo, useEffect, useState } from "react";
import { fetchIngredients } from "../../utils/fetchOrderData";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const [ingredient, setIngredient] = useState({
    image: "",
    name: "",
    calories: "",
    proteins: "",
    fat: "",
    carbohydrates: "",
  });

  const { id } = useParams();
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;

  const get = async () => {
    const data = await fetchIngredients().then((data) => data);
    if (data.success) {
      const currentIngredient = data.data.find((el) => el._id === id);
      setIngredient({
        image: currentIngredient.image_large,
        name: currentIngredient.name,
        calories: currentIngredient.calories,
        proteins: currentIngredient.proteins,
        fat: currentIngredient.fat,
        carbohydrates: currentIngredient.carbohydrates,
      });
    }
  };

  useEffect(() => {
    get();
  }, [id]);

  return (
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
  );
}

export default memo(IngredientDetails);
