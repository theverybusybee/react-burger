import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import StuffElementsStyles from './stuff-elements.module.css';
import { ingredientType } from "../../utils/types";

export default function StuffElements({ ingredient }) {
  return (
    <div className={StuffElementsStyles.container}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}

StuffElements.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
}; 