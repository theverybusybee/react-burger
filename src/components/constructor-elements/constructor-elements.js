import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElementsStyles from "./constructor-elements.module.css";

export default function ConstructorElements({ ingredient, type, isLocked }) {
  if (type === "top") {
    return (
      <div className={ConstructorElementsStyles.elementWrapper}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${ingredient.name} (верх)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    );
  } else if (type === "bottom") {
    return (
      <div className={ConstructorElementsStyles.elementWrapper}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${ingredient.name} (низ)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
        />
      </div>
    );
  } else if (type === "stuffing") {
    return (
      <div className={ConstructorElementsStyles.container}>
        <DragIcon />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          isLocked={isLocked}
        />
      </div>
    );
  }
}

/* 
ConstructorElements.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
};
*/
