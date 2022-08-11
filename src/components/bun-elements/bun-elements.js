import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import BunElementsStyles from './bun-elements.module.css'
import { ingredientType } from "../../utils/types";

export default function BunElements(props) {
  return (
    <div className={BunElementsStyles.dragContainer}>
      <div className={BunElementsStyles.elementWrapper}>
        <ConstructorElement className={BunElementsStyles.dragContainer}
        type="top"
        isLocked={true}
        text={`${props.ingredients.name} (верх)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
      </div>
      {props.children}
      <div className={BunElementsStyles.elementWrapper}>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${props.ingredients.name} (низ)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
      </div>
    </div>
  );
}

BunElements.propTypes = {
  children: PropTypes.element,
  ingredients: PropTypes.shape(ingredientType),
}; 