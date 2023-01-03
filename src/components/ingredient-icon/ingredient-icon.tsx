import { TIngredient } from "../../services/types/data";
import IconStyles from "./ingredient-icon.module.css";

interface IIngredientIcon {
  type: string;
  ingredient?: TIngredient;
  lastIngredient?: TIngredient;
  ingredientsArray?: Array<string>;
  tagType: string;
}

function IngredientIcon({
  type,
  ingredient,
  lastIngredient,
  ingredientsArray,
  tagType,
}: IIngredientIcon) {
  const CustomTag = tagType === "li" ? "li" : "div";
  return (type === "ordinary ingredient") ? (
    <CustomTag className={IconStyles.ingredient}>
      <div className={IconStyles.ingredientBackground}>
        <img
          className={IconStyles.ingredientImage}
          src={ingredient!.image_large}
          alt={ingredient!.name}
        />
      </div>
    </CustomTag>
  ) : ( 
    <li className={IconStyles.ingredient}>
      <div className={IconStyles.ingredientBackground}>
        <img
          className={`${IconStyles.ingredientImage} ${IconStyles.lastIngredient}`}
          src={lastIngredient?.image}
          alt={lastIngredient?.name}
        />
        <p
          className={`${IconStyles.ingredientsAmount} text text_type_digits-default`}
        >
          &#43;{`${ingredientsArray!.length - 6}`}
        </p>
      </div>
    </li>
  );
}

export default IngredientIcon;
