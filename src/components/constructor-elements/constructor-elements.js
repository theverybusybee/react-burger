import React, { useMemo } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorElementsStyles from "./constructor-elements.module.css";
import { useDispatch } from "react-redux";
import { SET_TOTAL_PRICE } from "../../services/actions/draggable-ingredient";
import { REMOVE_CONSTRUCTOR_ELEMENT } from "../../services/actions/draggable-ingredient";

const ConstructorElements = React.memo(({ ingredient, type, isLocked }) => {

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: REMOVE_CONSTRUCTOR_ELEMENT, id: ingredient._id })
  }

  if (type === "top") {
    return (
      <div className={ConstructorElementsStyles.elementWrapper}>
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={`${ingredient.name} (верх)`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handleClose}
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
          handleClose={handleClose}
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
          handleClose={handleClose}
        />
      </div>
    );
  }
});

export default ConstructorElements;
